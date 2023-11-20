from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    DrinkSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CartSerializer,
    UserSerializer,
)
from django.conf import settings
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import get_object_or_404

from .models import Drink, Cart, Order, OrderItem, User
from paypal.standard.forms import PayPalPaymentsForm

from random import randint
import os

# Global Total variable is used in the views to help calculate the total price of the cart


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


class RandomDrinkView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def get(self, request):
        random_drink = Drink.objects.order_by("?").first()
        serializer = DrinkSerializer(random_drink)
        return Response(serializer.data)


class CreateCartView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        cart = Cart.objects.create()

        request.session["cart_id"] = cart.id

        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CartDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        cart_id = request.session.get("cart_id")

        if cart_id:
            cart = get_object_or_404(Cart, id=cart_id)
        else:
            cart = Cart.objects.create()
            request.session["cart_id"] = cart.id

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        request.session.pop("cart_id", None)
        return Response(status=204)


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
        product_id = request.data.get("product_id", None)
        print(product_id)

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

        PayPalPaymentsForm(initial=paypal_dict)

        sandbox = settings.PAYPAL_TEST

        paypal_url = (
            "https://www.sandbox.paypal.com/cgi-bin/webscr"
            if sandbox
            else "https://www.paypal.com/cgi-bin/webscr"
        )

        # Return the PayPal URL in a JSON response
        return JsonResponse({"paypal_url": paypal_url})


class PaymentDoneView(APIView):
    def get(self, request, *args, **kwargs):
        host = request.get_host()
        return_url = "http://{}{}".format(host, reverse("payment-done"))
        # Your logic here
        return Response({"return_url": return_url})


class PaymentCancelledView(APIView):
    def get(self, request, *args, **kwargs):
        host = request.get_host()
        cancel_return = "http://{}{}".format(host, reverse("payment-cancelled"))
        # Your logic here
        return Response({"cancel_return": cancel_return})
