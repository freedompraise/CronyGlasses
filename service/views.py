from django.shortcuts import render
from .models import *

# Create your views here.

def index(request):
    drinks = Drink.objects.all()[:8]

    return render(request,'service/index.html')