from django.urls import path
from .import views

urlpatterns = [
    path('',views.index,name = 'home'),
    path('auth/',views.login_view,name = 'login'),
    path('auth/signup/',views.register,name='register')
]