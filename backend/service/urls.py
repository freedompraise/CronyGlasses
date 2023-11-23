from django.urls import path
from .views import (
    DrinkListView,
    DrinkDetailView,
    CartDetailView,
    PayPalCheckoutView,
    AddToCartView,
    RandomDrinkView,
    PaymentDoneView,
    PaymentCancelledView,
)

urlpatterns = [
    path("drinks/", DrinkListView.as_view(), name="drink-list"),
    path("drinks/<int:pk>/", DrinkDetailView.as_view(), name="drink-detail"),
    path("drinks/random/", RandomDrinkView.as_view(), name="drink-random"),
    path("cart/", CartDetailView.as_view(), name="cart-detail"),
    path("cart/add/", AddToCartView.as_view(), name="add-to-cart"),
    path("paypal/checkout/", PayPalCheckoutView.as_view(), name="paypal-checkout"),
    path("payment-done/", PaymentDoneView.as_view(), name="payment-done"),
    path(
        "payment-cancelled/", PaymentCancelledView.as_view(), name="payment-cancelled"
    ),
]
