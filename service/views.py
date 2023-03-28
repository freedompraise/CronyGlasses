from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.db.models import Sum
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.urls import reverse

from .models import *

from paypal.standard.forms import PayPalPaymentsForm

from decimal import Decimal

# Global Total variable handles a user havning no cart items yet
total = 0

def index(request):
    popular_products = Drink.objects.all()[:4]
    hot_gifts = Drink.objects.all()[4:8]
    total = 0
    try:
        total = sum(item.quantity for item in request.user.cart.order_items.all())
    except:
        pass
    return render(request,'service/index.html',{'total':total, 'popular':popular_products, 'hot':hot_gifts})


def login_view(request):
    total = 0
    form = AuthenticationForm(request.POST)
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('home') # Replace 'home' with the URL name of your homepage
        else:
            messages.error(request, 'Invalid email or password.')
    else:
        form = AuthenticationForm()
    return render(request, 'service/login.html', {'form': form, 'total':total})


def register(request):
    Cart.objects.create(user=request.user)
    total = sum(item.quantity for item in request.user.cart.order_items.all())
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']

        if User.objects.filter(email=email).exists():
            context = {'error': 'Email already exists'}
            return render(request, 'service/register.html', context)

        user = User.objects.create(email=email, first_name = first_name, last_name = last_name, password=password)
        login(request, user)
        return redirect('home')
        
    return render(request, 'service/register.html',{'total':total})


def product_page(request, pk):
    total = 0
    drink = get_object_or_404(Drink, pk=pk)
    if request.user.is_authenticated:
        total = sum(item.quantity for item in request.user.cart.order_items.all())
    return render(request, 'service/product.html', {
        'drink': drink,
        'total':total
    })


@login_required(login_url = 'login')
def add_to_cart(request, drink_id):
    drink = get_object_or_404(Drink, id=drink_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    order_items = cart.order_items.filter(drink=drink)
    if order_items.exists():
        order_item = order_items.first()
        order_item.quantity += 1
        order_item.save()
    else:
        order = Order.objects.create(user=request.user, total=0)
        order_item = OrderItem.objects.create(order=order, drink=drink, quantity=1)
        cart.order_items.add(order_item)
    
    return redirect('cart')

@login_required(login_url = 'login')
def cart(request):
    total = sum(item.quantity for item in request.user.cart.order_items.all())
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.order_items.all()
    cart.total = sum(item.quantity * item.drink.price for item in cart_items)
    cart.save()
    context = {
        'cart_items': cart_items,
        'cart_total': cart.total,
        'total':total
    }
    return render(request, 'service/cart.html', context)


@login_required
def cart_remove(request, order_item_id):
    # Get the Cart object for the current user
    cart = Cart.objects.get(user=request.user)
    # Get the OrderItem object from the database
    order_item = get_object_or_404(OrderItem, id=order_item_id)
    cart.order_items.remove(order_item)
    cart.save()

    return redirect('cart')


@login_required
def cart_update(request, order_item_id):
    cart, created = Cart.objects.get_or_create(user=request.user)
    order_item = get_object_or_404(OrderItem, id=order_item_id)

    if request.method == 'POST':
        new_quantity = request.POST.get('quantity')

        if new_quantity.isdigit() and int(new_quantity) > 0:
            order_item.quantity = int(new_quantity)
            order_item.save()

            cart.total = sum(item.total_price for item in cart.order_items.all())
            cart.save()

            messages.success(request, f"{order_item.drink.name} quantity has been updated.")
        else:
            messages.warning(request, "Invalid quantity.")

    context = {
        'order_item': order_item,
    }

    return redirect('cart')


@login_required
def checkout(request):
    cart = get_object_or_404(Cart, user=request.user)
    order_total = cart.order_items.aggregate(total=Sum('drink__price'))['total']
    order = Order.objects.create(user=request.user, total=order_total)

    for item in cart.order_items.all():
        order_item, created = OrderItem.objects.get_or_create(order=order, drink=item.drink)

        if not created:
            # If the OrderItem already exists, update the quantity instead of creating a new one
            order_item.quantity += item.quantity
            order_item.save()
        else:
            order_item.quantity = item.quantity
            order_item.save()

    cart.order_items.clear()
    cart.save()

    context = {
        'order': order,
        'total': order_total,
        'cart_items': cart.order_items.all()
    }
    return render(request, 'service/checkout.html', context)


@csrf_exempt
def paypal_checkout(request):
    host = request.get_host()

    # Get the cart and calculate total amount
    cart = Cart.objects.get(user=request.user)
    total = Decimal(sum(item.total_price for item in cart.order_items.all()))

    # Get the product (if not cart checkout)
    product = None
    if 'product_id' in request.POST:
        product_id = request.POST['product_id']
        product = get_object_or_404(Drink, id=product_id)
        total = product.price

    # Create PayPal payment form
    paypal_dict = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': str(total),
        'currency_code': 'USD',
        'notify_url': 'http://{}{}'.format(host, reverse('paypal-ipn')),
        'return_url': 'http://{}{}'.format(host, reverse('payment-done')),
        'cancel_return': 'http://{}{}'.format(host, reverse('payment-cancelled')),
    }
    if product:
        paypal_dict['item_name'] = product.name
        paypal_dict['invoice'] = product.id
    else:
        paypal_dict['item_name'] = "Cart Checkout"
        paypal_dict['invoice'] = cart.id

    form = PayPalPaymentsForm(initial=paypal_dict)

    # If the payment is complete, create order and order items
    if request.GET.get('payment_status') == 'Completed':
        if product:
            # Create order for single product
            order = Order.objects.create(user=request.user, total=total, status='submitted')
            OrderItem.objects.create(order=order, product=product, quantity=1)
        else:
            # Create order for cart items
            order = Order.objects.create(user=request.user, total=total, status='submitted')
            for item in cart.order_items.all():
                OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity)
            cart.order_items.clear()

        return redirect('home')
        
    return render(request, 'service/payment.html', {'form':form, 'page':'done','total':total})


def payment_done(request):
    order = request.session.get('order')
    if not order:
        return redirect('home')
    
    order_items = order.order_items.all()
    total = order.get_total()
    
    context = {
        'order_items': order_items,
        'total': total,
    }
    
    del request.session['order']
    return render(request, 'service/payment_done.html')

def payment_cancelled(request):
    return render(request, 'service/payment_cancelled.html')