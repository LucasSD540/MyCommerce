# Generated by Django 5.1.6 on 2025-03-11 14:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('favorite', '0002_alter_favorite_product'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='favorite',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='favorite',
            name='product',
        ),
    ]
