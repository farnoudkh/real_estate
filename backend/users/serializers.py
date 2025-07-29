from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'last_name', 'first_name', 'password', 'role']
        extra_kwargs = { 'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class LoginSerializer(serializers.Serializer):
    """
    This serializer is ONLY for validating input (email and password).
    It should NOT have a to_representation method for user output.
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserDetailSerializer(serializers.ModelSerializer):
    """
    This serializer is used to transform a CustomUser model instance
    into a dictionary for API responses.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role']

    