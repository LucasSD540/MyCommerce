# Generated by Django 5.1.6 on 2025-03-03 15:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='name',
            new_name='categoryName',
        ),
    ]
