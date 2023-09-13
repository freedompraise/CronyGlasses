from django.urls import reverse, resolve
from service.views import (
    home_view,
    product_page_view,
    cart_view,
    checkout_view,
    payment_done_view,
    payment_cancelled_view,
    paypal_checkout_view,
)

def test_home_url():
    url = reverse("home")
    assert resolve(url).func == home_view

def test_product_page_url():
    drink_id = 1  # Replace with an actual drink ID
    url = reverse("drinks", args=[drink_id])
    assert resolve(url).func == product_page_view

def test_cart_url():
    url = reverse("cart")
    assert resolve(url).func == cart_view

def test_checkout_url():
    url = reverse("checkout")
    assert resolve(url).func == checkout_view

def test_payment_done_url():
    url = reverse("payment-done")
    assert resolve(url).func == payment_done_view

def test_payment_cancelled_url():
    url = reverse("payment-cancelled")
    assert resolve(url).func == payment_cancelled_view

def test_paypal_checkout_url():
    url = reverse("paypal-checkout")
    assert resolve(url).func == paypal_checkout_view
