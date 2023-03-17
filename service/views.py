from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .models import *
from .forms import OrderForm

from paypal.standard.forms import PayPalPaymentsForm

from decimal import Decimal
# Create your views here.
def compute_order(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user = request.user
            order.total = total
            order.save()
            for item in cart_items:
                item.ordered = True
                item.save()
            return redirect('order_success')
    else:
        form = OrderForm()


def index(request):
    drinks = Drink.objects.all()[:8]
    total = sum(item.quantity for item in request.user.cart.order_items.all())
    return render(request,'service/index.html',{'total':total})


def login_view(request):
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
    return render(request, 'service/login.html', {'form': form})


def register(request):
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
        
    return render(request, 'service/register.html',{})


def product_page(request, pk):
    drink = get_object_or_404(Drink, pk=pk)

    # Query related drinks based on similarity metric
    # related_drinks = Drink.objects.filter(flavor=drink.flavor).exclude(pk=drink_id)[:4]

    return render(request, 'service/product.html', {
        'drink': drink,
        # 'related_drinks': related_drinks,
    })


@login_required
def add_to_cart(request, drink_id):
    drink = get_object_or_404(Drink, id=drink_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    order = Order.objects.create(user=request.user, total=0)
    order_item = OrderItem.objects.create(order=order, drink=drink, quantity=1)

    cart.order_items.add(order_item)

    # Update the cart's total price
    cart_items = cart.order_items.all()
    cart_total = Decimal(sum([item.total_price for item in cart_items]))
    cart.total = cart_total
    cart.save()
    
    return redirect('cart')

@login_required
def cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    cart_items = cart.order_items.all()
    total = 0
    for item in cart_items:
        total += item.quantity * item.drink.price
    cart_total = Decimal(total)
    cart.total = cart_total
    cart.save()
    context = {
        'cart_items': cart_items,
        'cart_total': cart_total,
    }

    return render(request, 'service/cart.html', context)


@login_required
def cart_remove(request, order_item_id):
    # Get the Cart object for the current user
    cart, created = Cart.objects.get_or_create(user=request.user)
    # Get the OrderItem object from the database
    order_item = get_object_or_404(OrderItem, id=order_item_id)
    if order_item:
        cart.order_items.remove(order_item)
        cart.save()
        messages.success(request, f"{order_item.drink.name} has been removed from your cart.")
    else:
        messages.warning(request, "The selected item is not in your cart.")
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
    cart, created = Cart.objects.get_or_create(user=request.user)
    order_items = cart.order_items.all()
    total = sum([item.total_price for item in order_items])

    if request.method == 'POST':
        # Create a new Order object
        order = Order.objects.create(user=request.user, total_price=total)

        # Move each item from the user's cart to the new order
        for item in order_items:
            OrderItem.objects.create(order=order, drink=item.drink, quantity=item.quantity)

        # Clear the user's cart
        cart.order_items.clear()

        # Redirect to the home page with a success message
        messages.success(request, "Your order has been placed!")
        return redirect('home')

    return render(request, 'service/checkout.html', context)


@login_required
def paypal_checkout(request):
    user = request.user
    products = Cart.objects.get(user=user.id)
    total_int = get_object_or_404(Order, pk=user.id)
    host = request.get_host()

    paypal_dict = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': str(total_int),
        'item_name': str([product.name+'\n' for product in products]),
      #  'invoice': str([product.name+'\n' for product in Product.objects.all()])
        'currency_code': 'USD',
        'notify_url': 'http://{}{}'.format(host,
                                           reverse('paypal-ipn')),
        'return_url': 'http://{}{}'.format(host,
                                           reverse('payment-done')),
        'cancel_return': 'http://{}{}'.format(host,
                                              reverse('payment-cancelled')),
    }

    form = PayPalPaymentsForm(initial=paypal_dict)
    return redirect(reverse('payment_complete'))


def payment_done(request):
    return render(request, 'service/payment_done.html')

def payment_cancelled(request):
    return render(request, 'service/payment_cancelled.html')