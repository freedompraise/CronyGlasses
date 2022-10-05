from django.urls import path

urlpatterns = [
    path('store/',views.home,name = 'home')
]