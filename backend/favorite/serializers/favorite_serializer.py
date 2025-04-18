from rest_framework import serializers
from ..models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Favorite
    fields = ['id', 'customer', 'product']
    read_only_fields = ['customer']
