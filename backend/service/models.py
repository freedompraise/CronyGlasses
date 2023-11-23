from django.db import models

from django.urls import reverse


class Drink(models.Model):
    name = models.CharField(max_length=100)

    price = models.DecimalField(max_digits=6, decimal_places=2)

    description = models.TextField()

    image = models.ImageField(upload_to="images", blank=True, null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("drinks", kwargs={"pk": self.pk})


class Carttem(models.Model):
    cart_id = models.CharField(max_length=50, blank=True, null=True)

    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)

    quantity = models.IntegerField(default=1, null=True)

    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True)

    class Meta:
        # Add a unique together constraint for the order and drink fields

        unique_together = ["cart_id", "drink"]

    def __str__(self):
        return f"{self.quantity} of {self.drink.name} in Cart {self.cart_id}"

    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.drink.price

        super().save(*args, **kwargs)


class Cart(models.Model):
    cart_items = models.ManyToManyField(Carttem)

    total = models.DecimalField(max_digits=6, decimal_places=2, default=0, null=True)

    def __str__(self):
        return f"Cart {self.id}"

    def update_total(self):
        self.total = sum(item.total_price for item in self.cart_items.all())

        self.save()
