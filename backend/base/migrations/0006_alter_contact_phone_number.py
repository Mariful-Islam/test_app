# Generated by Django 3.2.19 on 2024-03-12 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_contact_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contact',
            name='phone_number',
            field=models.CharField(max_length=15),
        ),
    ]
