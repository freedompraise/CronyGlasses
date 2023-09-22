from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import (
    DrinkSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CartSerializer,
    UserSerializer,
)
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.urls import reverse
from django.utils.crypto import get_random_string

from .models import Drink, Cart, Order, OrderItem, User
from paypal.standard.forms import PayPalPaymentsForm

from decimal import Decimal

# Global Total variable is used in the views to help calculate the total price of the cart
from .utils import total, related_products, reviews


class UserRegisterView(CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(pk=response.data["id"])
        refresh = RefreshToken.for_user(user)
        response.data["refresh"] = str(refresh)
        response.data["access"] = str(refresh.access_token)
        return response


class UserLoginView(APIView):
    serialier_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.login(serializer.validated_data)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response(
                    {"refresh": str(refresh), "access": str(refresh.access_token)}
                )

        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )


class DrinkListView(ListCreateAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer


class DrinkDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer


class CartDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class OrderDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemDetailView(RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class PayPalCheckoutView(APIView):
    def post(self, request):
        cart = Cart.objects.get(user=request.user)
        paypal_total = cart.total + 10
        # Get the product (if not cart checkout)
        product = None

        if "product_id" in request.POST:
            product_id = request.POST["product_id"]
            product = get_object_or_404(Drink, id=product_id)
            paypal_total = product.price

        # Create PayPal payment form
        paypal_dict = {
            "business": settings.PAYPAL_RECEIVER_EMAIL,
            "amount": str(paypal_total),
            "currency_code": "USD",
            "notify_url": "http://{}{}".format(host, reverse("paypal-ipn")),
            "return_url": "http://{}{}".format(host, reverse("payment-done")),
            "cancel_return": "http://{}{}".format(host, reverse("payment-cancelled")),
            "item_name": product.name if product else "Cart Checkout",
            "invoice": product.id if product else cart.id,
        }

        form = PayPalPaymentsForm(initial=paypal_dict)
