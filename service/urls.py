from django.urls import path
from .import views

urlpatterns = [
    path('',views.index,name = 'home'),
    path('auth/',views.login_view,name = 'login'),
    path('auth/register/',views.register,name='register'),
    path('cart/', views.cart, name='cart'),
    path('drinks/<int:pk>/',views.product_page, name='drinks'),
    path('cart/<int:drink_id>/update/', views.cart_update, name='cart_update'),
    path('<int:drink_id>/remove/', views.cart_remove, name='cart_remove'),
    path('checkout/', views.checkout, name='checkout'),
    path('paypal_checkout/', views.paypal_checkout, name='paypal_checkout'),
    path('payment-done/', views.payment_done, name='payment_done'),
    path('payment-cancelled/', views.payment_cancelled, name="payment_cancelled")
    ]