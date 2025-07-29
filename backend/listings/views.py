from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Listing
from .serializers import ListingSerializer, listingDetailSerializer
from datetime import datetime, timezone, timedelta
from .filters import ListingFilter
from django_filters.rest_framework import DjangoFilterBackend

class ListingsView(ListAPIView):
    queryset = Listing.objects.filter(is_published=True).order_by('-publish_date')
    permission_classes = (permissions.AllowAny, )
    filter_backends = [DjangoFilterBackend]
    filterset_class = ListingFilter
    serializer_class = ListingSerializer
    lookup_field = 'slug'

class ListingView(RetrieveAPIView):
    queryset = Listing.objects.order_by('-publish_date').filter(is_published=True)
    serializer_class = listingDetailSerializer
    lookup_field = 'slug'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        listing = self.get_object()
        context['latitude'] = listing.latitude
        context['longitude'] = listing.longitude
        return context


