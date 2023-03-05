from django.urls import path
from .import views

urlpatterns = [
    path('',views.index,name = 'home'),
    path('auth/',views.login_view,name = 'login'),
    path('auth/register/',views.register,name='register'),
    path('drinks/<int:pk>/',views.product_page, name='drinks')
    ]