from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
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
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.urls import reverse
from django.utils.decorators import method_decorator

from .models import Drink, Cart, Order, OrderItem, User
from paypal.standard.forms import PayPalPaymentsForm

from rest_framework.parsers import JSONParser
from random import randint
import ast
import os

# Global Total variable is used in the views to help calculate the total price of the cart
from .utils import total, related_products, reviews


class UserRegisterView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(pk=response.data["id"])
        refresh = RefreshToken.for_user(user)
        response.data["refresh"] = str(refresh)
        response.data["access"] = str(refresh.access_token)
        return response


class DrinkListView(ListCreateAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]


class DrinkDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Get related drinks (4 random drinks excluding the current drink)
        related_drinks = Drink.objects.exclude(pk=instance.pk).order_by("?")[:3]
        related_drinks_serializer = DrinkSerializer(related_drinks, many=True)

        # Generate a random review count
        review_count = randint(1, 1000)

        response_data = {
            "drink": serializer.data,
            "related_drinks": related_drinks_serializer.data,
            "reviews": review_count,
        }

        return Response(response_data)


class CreateCartView(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cart = Cart.objects.get(pk=response.data["id"])
        cart.user = request.user
        cart.save()
        return response


class CartDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]


class OrderDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]


class CreateOrderView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        order = Order.objects.get(pk=response.data["id"])
        cart = Cart.objects.get(user=request.user)
        order.cart = cart
        order.save()
        return response


class OrderItemDetailView(RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]


class CreateOrderItemView(CreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        orderitem = OrderItem.objects.get(pk=response.data["id"])
        order = Order.objects.get(cart__user=request.user, is_ordered=False)
        orderitem.order = order
        orderitem.save()
        return response


class PayPalCheckoutView(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        host = os.getenv("PAYPAL_RECEIVER_EMAIL")
        data_string = request.data["_content"]
        data_dict = ast.literal_eval(data_string)
        product_id = data_dict.get("product_id", None)

        if product_id:
            product = get_object_or_404(Drink, id=product_id)
            total = product.price
            invoice_id = product.id
            item_name = product.name
        elif request.user.is_authenticated:
            cart = Cart.objects.get(user=request.user)
            total = cart.total  # assuming 'total' attribute exists in Cart model
            invoice_id = cart.id
            item_name = "Cart Checkout"
        else:
            return JsonResponse(
                {
                    "detail": "Authentication credentials were not provided or no product selected."
                },
                status=403,
            )

        paypal_dict = {
            "business": settings.PAYPAL_RECEIVER_EMAIL,
            "amount": str(total),
            "currency_code": "USD",
            "notify_url": "http://{}{}".format(host, reverse("paypal-ipn")),
            "return_url": "http://{}{}".format(host, reverse("payment-done")),
            "cancel_return": "http://{}{}".format(host, reverse("payment-cancelled")),
            "item_name": item_name,
            "invoice": invoice_id,
        }

        form = PayPalPaymentsForm(initial=paypal_dict)


class RandomDrinkView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def get(self, request):
        random_drink = Drink.objects.order_by("?").first()
        serializer = DrinkSerializer(random_drink)
        return Response(serializer.data)
