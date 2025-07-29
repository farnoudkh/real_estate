# filters.py
import django_filters
from .models import Listing

class ListingFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='gte')
    bathrooms = django_filters.NumberFilter(field_name='bathrooms')
    city = django_filters.CharFilter(field_name='city', lookup_expr='icontains')
    zip_code = django_filters.CharFilter(field_name='zip_code', lookup_expr='icontains')
    sale_type = django_filters.ChoiceFilter(choices=Listing.SaleType.choices)
    home_type = django_filters.ChoiceFilter(choices=Listing.HomeType.choices)

    class Meta:
        model = Listing
        fields = ['sale_type', 'home_type', 'bedrooms', 'bathrooms', 'city', 'zip_code']