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

from .models import *
from .forms import CustomAuthenticationForm
from paypal.standard.forms import PayPalPaymentsForm

from decimal import Decimal

import random

# Global Total variable handles a user havning no cart items yet
total = 0

# View for the index page
def index(request):
    # Get the first 4 drinks in the database as popular products
    popular_products = Drink.objects.all()[:4]
    # Get the next 4 drinks in the database as hot gifts
    hot_gifts = Drink.objects.all()[4:8]
    total = 0
    try:
        # If the user is logged in, get the total number of items in their cart
        total = sum(item.quantity for item in request.user.cart.order_items.all())
    except:
        pass
    # Render the index.html template with the popular products, hot gifts, and cart total
    return render(request,'service/index.html',{'total':total, 'popular':popular_products, 'hot':hot_gifts})

def related_products(product_id):
    drinks = Drink.objects.all()
    product_list = list(drinks)
    product_list = [product for product in product_list if product.id != product_id]
    if len(product_list) < 4:
        return product_list
    return random.sample(product_list, 4)

# View for the login page
def login_view(request):
    total = 0
    if request.method == 'POST':
        # If the form was submitted, create an AuthenticationForm instance with the submitted data
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            # If the form is valid, get the user's email and password from the form's cleaned data
            email = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            # Authenticate the user with the provided email and password
            user = authenticate(request, email=email, password=password)
            if user is not None:
                # If the user is authenticated, log them in and redirect them to the home page
                login(request, user)
                return redirect('home')
            else:
                # If the user is not authenticated, show an error message
                messages.error(request, 'Invalid email or password.')
        else:
            # If the form is not valid, show an error message
            messages.error(request, 'Invalid email or password.')
    else:
        # If the form was not submitted, create a new AuthenticationForm instance
        form = AuthenticationForm()
    # Render the login.html template with the form and cart total
    return render(request, 'service/login.html', {'form': form, 'total': total})


# View for the registration page
def register(request):
    total = 0
    if request.method == 'POST':
        # If the form was submitted, get the user's input data
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']    
        # Generate a random username for the user
        username = get_random_string(length=10)     
        # Try to get a user with the provided email address
        user, created = User.objects.get_or_create(email=email, username=username, defaults={'first_name': first_name, 'last_name': last_name, 'password': password})
        if created:
            # If the user was created, log them in and create a new cart for them
            login(request, user)
            Cart.objects.create(user=user)
            return redirect('home')
        # If the user already exists, show an error message
        messages.error(request, 'User with email already exists')
        return redirect('register')
    # If the form was not submitted, render the register.html template with the cart total
    return render(request, 'service/register.html',{'total': total})


# View for a drink's product page
def product_page(request, pk):
    if request.user.is_authenticated:
        total = sum(item.quantity for item in request.user.cart.order_items.all())

    return render(request, 'service/product.html', {
        'drink': get_object_or_404(Drink, pk=pk),
        'total': 0,
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
    total = sum(item.quantity for item in request.user.cart.order_items.all())
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.order_items.all()
    cart.save()
    context = {
        'cart_items': cart_items,
        'cart': cart,
        'total':total,
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
    order = Order.objects.create(user=request.user, total=cart.total)
        
    if request.method == 'POST':
        cart.order_items.clear()
        cart.save()

    context = {
        'total': sum(item.quantity for item in request.user.cart.order_items.all()),
        'cart': cart,
        'checkout_total': cart.total + 10 # change name to total 
    }

    return render(request, 'service/checkout.html', context)


@login_required(login_url = 'login')
def paypal_checkout(request):
    host = request.get_host()

    # Get the cart and calculate total amount
    cart = Cart.objects.get(user=request.user)
    total = cart.total + 10

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