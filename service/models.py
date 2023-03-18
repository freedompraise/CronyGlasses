from django.db import models
from django.contrib.auth.models import User


class Drink(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    flavor = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=6, decimal_places=2, default = 0, null = True)
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('fulfilled', 'Fulfilled'),
        ('canceled', 'Canceled'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')

    def calculate_total(self):
        order_items = self.orderitem_set.all()
        total = sum(item.total_price for item in order_items)
        self.total = total
        self.save()

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    
    class Meta:
        # Add a unique together constraint for the order and drink fields
        unique_together = ['order', 'drink']

    def __str__(self):
        return f"{self.quantity} of {self.drink.name}"

    @property
    def total_price(self):
        return self.quantity * self.drink.price

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    order_items = models.ManyToManyField(OrderItem)

    def __str__(self):
        return f"{self.user}'s cart"

