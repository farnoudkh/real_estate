from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, last_name, first_name, password=None, **extra_fields):
        if not email : 
            raise ValueError("Email is a required field")
        email = self.normalize_email(email)
        user = self.model(email=email, last_name=last_name, first_name=first_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, last_name, first_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, last_name, first_name, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(max_length=200, unique=True)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    birth_day = models.DateField(null=True, blank=True)
    username = models.CharField(max_length = 200, null=True, blank=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["last_name", "first_name"]

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def get_short_name(self):
        return self.first_name