from django.urls import path
from .views import RealtorListView, ReatlorView

urlpatterns = [
    path('', RealtorListView.as_view()),
    path('<pk>', ReatlorView.as_view()),
]