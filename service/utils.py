import random


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
