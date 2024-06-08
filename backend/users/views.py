from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from .models import *
from rest_framework.response import Response 
from django.contrib.auth import get_user_model, authenticate
from rest_framework import status
from knox.models import AuthToken

User = get_user_model()

class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            error_message = ''
            print(serializer.errors)
            if 'email' in serializer.errors:
                error_message = "L'adresse mail existe déjà. Veuillez-vous connecter"
            else:
                error_message = 'An error occurred. Please try again later.'
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(request, email=email, password=password)
            if user:
                _, token = AuthToken.objects.create(user)
                return Response(
                    {
                        "user": self.serializer_class(user).data,
                        "token": token
                    }
                )
            else:
                error_message = "Les informations ne sont pas correctes"
                return Response({"error": error_message}, status=401)
        else:
            error_message = "L'utilisateur n'existe pas"
            return Response({'error': error_message}, status=400)