from django.urls import path
from .views import (
    register_view,
    login_view,
    home_view,
    product_page_view,
    cart_view,
    add_to_cart,
    remove_from_cart,
    update_cart_item,
    checkout_view,
    payment_done_view,
    payment_cancelled_view,
    paypal_checkout_view,
)

urlpatterns = [
    path("", home_view, name="home"),
    path("auth/login/", login_view, name="login"),
    path("auth/register/", register_view, name="register"),
    path("cart/", cart_view, name="cart"),
    path("drinks/<int:pk>/", product_page_view, name="drinks"),
    path("cart/<int:drink_id>/add/", add_to_cart, name="add-to-cart"),
    path("update/<int:order_item_id>/", update_cart_item, name="order-item-update"),
    path("remove/<int:order_item_id>/", remove_from_cart, name="cart-remove"),
    path("checkout/", checkout_view, name="checkout"),
    path("paypal_checkout/", paypal_checkout_view, name="paypal-checkout"),
    path("payment_done/", payment_done_view, name="payment-done"),
    path("payment_cancelled/", payment_cancelled_view, name="payment-cancelled"),
]
