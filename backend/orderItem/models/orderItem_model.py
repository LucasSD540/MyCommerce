from django.db import models
from order.models import Order
from product.models import Product

class OrderItemModel(models.Model):
  order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='products')
  quantity = models.PositiveIntegerField(default=1)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  total_price = models.DecimalField(max_digits=10, decimal_places=2)
  discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    db_table = 'tb_orderItem'

  def save(self, *args, **kwargs):
    self.total_price = (self.price - self.discount) * (self.quantity)
    super().save(*args, **kwargs)

  def __str__(self):
    return f"Item {self.product.name} (x{self.quantity}) do pedido {self.order.id}"
