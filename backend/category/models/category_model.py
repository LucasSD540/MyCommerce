from django.db import models

class Category(models.Model):
  categoryName = models.CharField(max_length=255, unique=True)

  class Meta:
    db_table = 'tb_category'
