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
    CartItemSerializer,
    CartSerializer,
)
from django.conf import settings
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import get_object_or_404

from .models import Drink, Cart, CartItem
from paypal.standard.forms import PayPalPaymentsForm

from random import randint
import os


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


class AddToCartView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def post(self, request, *args, **kwargs):
        drink_id = request.data.get("drink_id")
        quantity = request.data.get("quantity")
        drink = get_object_or_404(Drink, pk=drink_id)

        cart_id = request.session.get("cart_id")
        if cart_id:
            cart = get_object_or_404(Cart, pk=cart_id)
        else:
            cart = Cart.objects.create()
            request.session["cart_id"] = cart.id

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, drink=drink, defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()
        cart.update_total()
        return Response({"cart_id": cart.id})


class CartDetailView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def get(self, request, *args, **kwargs):
        cart_id = request.session.get("cart_id")
        if cart_id:
            cart = get_object_or_404(Cart, pk=cart_id)
        else:
            cart = None
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class PayPalCheckoutView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [BasicAuthentication]

    def get(self, request, *args, **kwargs):
        cart_id = request.session.get("cart_id")
        cart = get_object_or_404(Cart, id=cart_id)

        paypal_dict = {
            "business": settings.PAYPAL_RECEIVER_EMAIL,
            "amount": cart.total,
            "item_name": "Order {}".format(cart.id),
            "invoice": str(cart.id),
            "notify_url": "http://{}{}".format(
                request.get_host(), reverse("paypal-ipn")
            ),
            "return_url": "http://{}{}".format(
                request.get_host(), reverse("payment-done")
            ),
            "cancel_return": "http://{}{}".format(
                request.get_host(), reverse("payment-cancelled")
            ),
        }

        form = PayPalPaymentsForm(initial=paypal_dict)
        return Response({"form": form.render()})


class PaymentDoneView(APIView):
    def get(self, request, *args, **kwargs):
        host = request.get_host()
        return_url = "http://{}{}".format(host, reverse("payment-done"))
        return Response({"return_url": return_url})


class PaymentCancelledView(APIView):
    def get(self, request, *args, **kwargs):
        host = request.get_host()
        cancel_return = "http://{}{}".format(host, reverse("payment-cancelled"))
        return Response({"cancel_return": cancel_return})
