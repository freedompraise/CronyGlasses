from django.urls import path
from .views import (
    UserRegisterView,
    UserLoginView,
    DrinkListView,
    DrinkDetailView,
    CartDetailView,
    OrderDetailView,
    OrderItemDetailView,
    PayPalCheckoutView,
)

urlpatterns = [
    path("register/", UserRegisterView.as_view(), name="user-register"),
    path("login/", UserLoginView.as_view(), name="user-login"),
    path("drinks/", DrinkListView.as_view(), name="drink-list"),
    path("drinks/<int:pk>/", DrinkDetailView.as_view(), name="drink-detail"),
    path("cart/<int:pk>/", CartDetailView.as_view(), name="cart-detail"),
    path("order/<int:pk>/", OrderDetailView.as_view(), name="order-detail"),
    path("orderitem/<int:pk>/", OrderItemDetailView.as_view(), name="orderitem-detail"),
    path("paypal/checkout/", PayPalCheckoutView.as_view(), name="paypal-checkout"),
]
