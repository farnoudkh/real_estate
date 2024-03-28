from django.urls import path
from .views import ListingView, ListingsView


urlpatterns = [
    path('', ListingsView.as_view()),
    path('<slug>', ListingView.as_view())
]