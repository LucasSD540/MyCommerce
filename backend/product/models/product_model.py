from django.db import models

class Product(models.Model):
  name = models.CharField(max_length=255)
  description = models.TextField()
  price = models.DecimalField(max_digits=10, decimal_places=2)
  stock = models.PositiveIntegerField(default=0)
  image_url = models.URLField(max_length=500, blank=True, null=True)
  category = models.CharField(max_length=50, blank=True, null=True)
  created_at = models.DateField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)

  def __str__(self):
    return self.name
