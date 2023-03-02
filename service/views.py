from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
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
        # confirm_password = request.POST['confirm_password']

        # if password != confirm_password:
        #     context = {'error': 'Passwords do not match'}
        #     return render(request, 'registration/register.html', context)

        if User.objects.filter(email=email).exists():
            context = {'error': 'Email already exists'}
            return render(request, 'service/register.html', context)

        user = User.objects.create(email=email, first_name = first_name, last_name = last_name, password=password)
        login(request, user)
        return redirect('home')
        
    return render(request, 'service/register.html',{})

@login_required
def cart(request):
    cart = request.session.get('cart', {})
    cart_items = []
    total = 0
    for drink_id, quantity in cart.items():
        drink = Drink.objects.get(id=drink_id)
        price = drink.price * quantity
        total += price
        cart_items.append({
            'id': drink_id,
            'name': drink.name,
            'image':drink.image,
            'price': drink.price,
            'quantity': quantity,
            'total_price': price,
        })

    context = {
        'cart_items': cart_items,
        'subtotal': total,
    }

    return render(request, 'service/cart.html', context)


def product_page(request, drink_id):
    drink = get_object_or_404(Drink, pk=drink_id)

    # Query related drinks based on similarity metric
    related_drinks = Drink.objects.filter(flavor=drink.flavor).exclude(pk=drink_id)[:4]

    return render(request, 'product_page.html', {
        'drink': drink,
        'related_drinks': related_drinks,
    })