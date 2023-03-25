from django.urls import path
from .import views

urlpatterns = [
    path('',views.index,name = 'home'),
    path('auth/',views.login_view,name = 'login'),
    path('auth/register/',views.register,name='register'),
    path('cart/', views.cart, name='cart'),
    path('drinks/<int:pk>/',views.product_page, name='drinks'),
    path('cart/<int:drink_id>/add/', views.add_to_cart, name='add_to_cart'),
    path('update/<int:order_item_id>/', views.cart_update, name='cart_update'),
    path('remove/<int:order_item_id>/', views.cart_remove, name='cart_remove'),
    path('checkout/', views.checkout, name='checkout'),
    path('paypal_checkout/', views.paypal_checkout, name='paypal_checkout'),
    path('payment_done/', views.payment_done, name='payment-done'),
    path('payment_cancelled/', views.payment_cancelled, name="payment-cancelled"),
    ]