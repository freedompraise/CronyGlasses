from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.db.models import Sum
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.urls import reverse
from django.utils.crypto import get_random_string

from .models import Drink, Cart, Order, OrderItem, User
from .forms import CustomAuthenticationForm
from paypal.standard.forms import PayPalPaymentsForm

from decimal import Decimal

import random

# Global Total variable handles a user havning no cart items yet
def total(request):
    return (sum(item.quantity for item in request.user.cart.order_items.all()) if request.user.is_authenticated else 0 )

# View for the index page
def index(request):
    popular_products = Drink.objects.all()[:4]
    hot_gifts = Drink.objects.all()[4:8]
    return render(request,'service/index.html',{'total':total(request), 'popular':popular_products, 'hot':hot_gifts})

def related_products(product_id):
    drinks = Drink.objects.all()
    product_list = list(drinks)
    product_list = [product for product in product_list if product.id != product_id]
    if len(product_list) < 4:
        return product_list
    return random.sample(product_list, 4)

# View for the login page
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Invalid email or password.')
        else:
            messages.error(request, 'Invalid email or password.')
    else:
        form = AuthenticationForm()
    # Render the login.html template with the form and cart total
    return render(request, 'service/login.html', {'form': form, 'total': total(request)})


# View for the registration page
def register(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']    
        # Generate a random username for the user
        username = get_random_string(length=10)     
        user, created = User.objects.get_or_create(email=email, username=username, defaults={'first_name': first_name, 'last_name': last_name, 'password': password})
        if created:
            login(request, user)
            Cart.objects.create(user=user)
            return redirect('home')
        messages.error(request, 'User with email already exists')
        return redirect('register')
    # If the form was not submitted, render the register.html template with the cart total
    return render(request, 'service/register.html',{'total': total(request) })


# View for a drink's product page
def product_page(request, pk):
    return render(request, 'service/product.html', {
        'drink': get_object_or_404(Drink, pk=pk),
        'total': total(request),
        'related_products':related_products(product_id=pk),
        'reviews': random.randint(1,500),
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
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.order_items.all()
    cart.save()
    context = {
        'cart_items': cart_items,
        'cart': cart,
        'total':total(request),
        'discount': round(Decimal('0.1') * cart.total),
    }
    return render(request, 'service/cart.html', context)


@login_required
def cart_remove(request, order_item_id):
    cart = Cart.objects.get(user=request.user)
    order_item = get_object_or_404(OrderItem, id=order_item_id)
    cart.order_items.remove(order_item)
    cart.save()

    return redirect('cart')


@login_required
def order_item_update(request, order_item_id):
    cart, created = Cart.objects.get_or_create(user=request.user)
    order_item = get_object_or_404(OrderItem, id=order_item_id)

    if request.method == 'POST':
        new_quantity = request.POST.get('quantity')

        if new_quantity.isdigit() and int(new_quantity) > 0:
            order_item.quantity = int(new_quantity)
            order_item.save()
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
    order = Order.objects.create(user=request.user, total=cart.total)
        
    if request.method == 'POST':
        cart.order_items.clear()
        cart.save()

    context = {
        'total': total(request),
        'cart': cart,
        'checkout_total': cart.total + 10 # change name to total 
    }

    return render(request, 'service/checkout.html', context)


@login_required(login_url = 'login')
def paypal_checkout(request):
    host = request.get_host()
    cart = Cart.objects.get(user=request.user)
    paypal_total = cart.total + 10

    # Get the product (if not cart checkout)
    product = None
    if 'product_id' in request.POST:
        product_id = request.POST['product_id']
        product = get_object_or_404(Drink, id=product_id)
        paypal_total = product.price

    # Create PayPal payment form
    paypal_dict = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': str(paypal_total),
        'currency_code': 'USD',
        'notify_url': 'http://{}{}'.format(host, reverse('paypal-ipn')),
        'return_url': 'http://{}{}'.format(host, reverse('payment-done')),
        'cancel_return': 'http://{}{}'.format(host, reverse('payment-cancelled')),
        'item_name': product.name if product else 'Cart Checkout',
        'invoice': product.id if product else cart.id,
    }

    form = PayPalPaymentsForm(initial=paypal_dict)
        
    return render(request, 'service/payment.html', { 'form':form, 'page':'done','paypal_total':paypal_total, 'total': total(request) })


def payment_done(request):
    Order.objects.filter(user=request.user).delete()
    cart = Cart.objects.get(user=request.user)
    OrderItem.objects.filter(cart=cart).delete()
    return redirect('home')
    
   
def payment_cancelled(request):
    return render(request, 'service/payment_cancelled.html')