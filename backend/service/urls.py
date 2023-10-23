from django.urls import path
from .views import (
    UserRegisterView,
    DrinkListView,
    DrinkDetailView,
    CartDetailView,
    OrderDetailView,
    OrderItemDetailView,
    PayPalCheckoutView,
    CreateCartView,
    CreateOrderView,
    CreateOrderItemView,
    RandomDrinkView,
)

urlpatterns = [
    path("register/", UserRegisterView.as_view(), name="user-register"),
    path("drinks/", DrinkListView.as_view(), name="drink-list"),
    path("drinks/<int:pk>/", DrinkDetailView.as_view(), name="drink-detail"),
    path("drinks/random/", RandomDrinkView.as_view(), name="drink-random"),
    path("cart/<int:pk>/", CartDetailView.as_view(), name="cart-detail"),
    path("cart/", CreateCartView.as_view(), name="cart-create"),
    path("order/<int:pk>/", OrderDetailView.as_view(), name="order-detail"),
    path("order/", CreateOrderView.as_view(), name="order-create"),
    path("orderitem/<int:pk>/", OrderItemDetailView.as_view(), name="orderitem-detail"),
    path("orderitem/", CreateOrderItemView.as_view(), name="orderitem-create"),
    path("paypal/checkout/", PayPalCheckoutView.as_view(), name="paypal-checkout"),
]
