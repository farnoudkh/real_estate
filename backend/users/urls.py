from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')


urlpatterns = [
    path('logout/', LogoutViewset.as_view({'post': 'create'}), name='logout'),
    *router.urls,
]