from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .models import *
from .forms import OrderForm

from paypal.standard.forms import PayPalPaymentsForm
# Create your views here.

def index(request):
    drinks = Drink.objects.all()[:8]

    return render(request,'service/index.html')


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
    drink = get_object_or_404(Drink, pk=drink_id)
    cart, _ = Cart.objects.get_or_create(user=request.user, drink=drink)
    cart.quantity += 1
    cart.save()
    messages.success(request, f"{drink.name} added to cart!")
    return redirect('cart')


@login_required
def cart(request):
    cart_items = Cart.objects.filter(user=request.user)
    total = 0
    for item in cart_items:
        total += item.quantity * item.drink.price
    context = {
        'cart_items': cart_items,
        'subtotal': total,
    }
    return render(request, 'service/cart.html', context)


@login_required
def cart_update(request, drink_id):
    quantity = request.POST.get('quantity')
    cart_item = Cart.objects.filter(user=request.user, drink_id=drink_id).first()

    if cart_item is not None:
        if quantity == '0':
            cart_item.delete()
        else:
            cart_item.quantity = int(quantity)
            cart_item.save()
    else:
        drink = Drink.objects.get(id=drink_id)
        cart_item = Cart(user=request.user, drink=drink, quantity=int(quantity))
        cart_item.save()

    return redirect('cart')


@login_required
def cart_remove(request, drink_id):
    cart = request.session.get('cart', {})
    if str(drink_id) in cart:
        cart.pop(str(drink_id))
        request.session['cart'] = cart

    return redirect('cart')



@login_required
def checkout(request):
    cart_items = OrderItem.objects.filter(user=request.user, ordered=False)
    subtotal = 0
    for item in cart_items:
        subtotal += item.total_price
    tax = round(subtotal * 0.15, 2)
    total = round(subtotal + tax, 2)

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

    context = {
        'cart_items': cart_items,
        'subtotal': subtotal,
        'tax': tax,
        'total': total,
        'form': form,
    }
    return render(request, 'service/checkout.html', context)


@login_required
def paypal_checkout(request):
    user = request.user
    products = Cart.objects.get(user=user.id)
    total_int = get_total(request, products)
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