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
                error_message = "Email already exists"
            else:
                error_message = 'An error occurred. Please try again later.'
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    # This serializer_class is primarily for `data=request.data` validation
    serializer_class = LoginSerializer

    def create(self, request):
        # 1. Validate incoming login data using LoginSerializer
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True) # Automatically returns 400 if invalid

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        # 2. Authenticate the user
        user = authenticate(request, email=email, password=password)

        if user:
            # 3. Create authentication token (Knox)
            _, token = AuthToken.objects.create(user)

            # 4. SERIALIZE THE AUTHENTICATED USER OBJECT FOR THE RESPONSE
            # Use the new UserDetailSerializer to correctly serialize the 'user' object
            user_data_for_frontend = UserDetailSerializer(user).data # <-- CRUCIAL LINE

            return Response(
                {
                    "user": user_data_for_frontend, # Send the properly serialized user data
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )
        else:
            # If authentication (email/password check) fails
            return Response(
                {"error": "Invalid credentials. Please check your email and password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        
class LogoutViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        try:
            request._auth.delete()
        except AttributeError:
            return Response({"error": "No active token found."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)