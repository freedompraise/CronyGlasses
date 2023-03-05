from django.urls import path
from .import views

urlpatterns = [
    path('',views.index,name = 'home'),
    path('auth/',views.login_view,name = 'login'),
    path('auth/register/',views.register,name='register'),
    path('cart/', views.cart, name='cart'),
    path('drinks/<int:pk>/',views.product_page, name='drinks'),
    path('cart/<int:drink_id>/update/', views.cart_update, name='cart_update'),
    ]