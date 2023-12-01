from rest_framework import serializers
from .models import Drink, CartItem, Cart


class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    drink = DrinkSerializer()  # Serialize the related Drink instance

    class Meta:
        model = CartItem
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(
        many=True, read_only=True
    )  # Serialize the related OrderItem instances

    class Meta:
        model = Cart
        fields = "__all__"
