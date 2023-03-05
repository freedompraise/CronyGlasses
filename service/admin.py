from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Drink)
admin.site.register(Cart)
admin.site.register(RelatedDrink)
admin.site.register(Order)
admin.site.register(OrderItem)