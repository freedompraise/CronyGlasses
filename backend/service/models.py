from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class Drink(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to="images/")
    flavor = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("drinks", kwargs={"pk": self.pk})


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0, null=True)
    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("submitted", "Submitted"),
        ("fulfilled", "Fulfilled"),
        ("canceled", "Canceled"),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")

    def calculate_total(self):
        order_items = self.orderitem_set.all()
        total = sum(item.total_price for item in order_items)
        self.total = total
        self.save()


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1, null=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True)

    class Meta:
        # Add a unique together constraint for the order and drink fields
        unique_together = ["order", "drink"]

    def __str__(self):
        return f"{self.quantity} of {self.drink.name}"

    def save(self, *args, **kwargs):
        if self.total_price == 0:
            self.total_price = self.quantity * self.drink.price
        super().save(*args, **kwargs)
        self.cart.update_total()  # update total after saving the order item

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.cart.update_total()  # update total after deleting the order item


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    order_items = models.ManyToManyField(OrderItem)
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0, null=True)

    def __str__(self):
        return f"{self.user}'s cart"

    def update_total(self):
        self.total = sum(item.total_price for item in self.order_items.all())
        self.save()
