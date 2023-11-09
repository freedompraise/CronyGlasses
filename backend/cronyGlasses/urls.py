from django.contrib import admin
from django.urls import path, include
from paypal.standard.ipn import views as paypal_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("service.urls")),
    path("paypal-ipn/", paypal_views.ipn, name="paypal-ipn"),
]
