from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Profile(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=8)
    phone_number = models.IntegerField()
    image = models.ImageField()
    division = models.CharField(max_length=100)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone_number']

    def __str__(self):
        return self.username


class Contact(models.Model):
    author = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=15)
    image = models.ImageField()
    division = models.CharField(max_length=100)


    def __str__(self) -> str:
        return self.username