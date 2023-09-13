import random
from service.models import User, Drink, Order, OrderItem, Cart

def total(request):
    return (
        sum(item.quantity for item in request.user.cart.order_items.all())
        if request.user.is_authenticated
        else 0
    )


def related_products(product_id, drinks):
    product_list = list(drinks)
    product_list = [product for product in product_list if product.id != product_id]
    if len(product_list) < 4:
        return product_list
    return random.sample(product_list, 4)


def reviews():
    return random.randint(1, 500)


def create_test_user(username="testuser", password="testpassword"):
    return User.objects.create_user(username=username, password=password)

def create_test_drink(name="Drink 1", price=None, description=None, image=None):
    return Drink.objects.create(name=name, price=price, description=description, image=image)

def create_test_cart(user):
    return Cart.objects.create(user=user)

def create_test_order(user, total, status="draft"):
    return Order.objects.create(user=user, total=total, status=status)

def create_test_order_item(order, drink, quantity):
    return OrderItem.objects.create(order=order, drink=drink, quantity=quantity)

def create_multiple_test_drinks(number_of_drinks):
    drinks = []
    for i in range(number_of_drinks):
        drinks.append(create_test_drink(name=f"Drink {i}"))
    return drinks