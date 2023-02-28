from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
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
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password != confirm_password:
            context = {'error': 'Passwords do not match'}
            return render(request, 'registration/register.html', context)

        if User.objects.filter(username=username).exists():
            context = {'error': 'Username already exists'}
            return render(request, 'registration/register.html', context)

        if User.objects.filter(email=email).exists():
            context = {'error': 'Email already exists'}
            return render(request, 'registration/register.html', context)

        user = User.objects.create_user(first_name = first_name, last_name = last_name, username=username, email=email, password=password)
        login(request, user)
        return redirect('home')
        
    return render(request, 'service/register.html', {'form': form})

