from rest_framework import serializers
from .models import Drink, CartItem, Cart, User


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
    order_items = OrderItemSerializer(
        many=True, read_only=True
    )  # Serialize the related OrderItem instances

    class Meta:
        model = Cart
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")

        def create(self, validated_data):
            user = User(
                username=validated_data["usernmae"],
            )
            user.set_password(validated_data["password"])
            user.save()
            Cart.objects.create(user=user)
            return user
