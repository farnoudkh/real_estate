from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    publish_date = serializers.DateField(format='%d/%m/%Y')

    class Meta:
        model = Listing
        fields = ('title', 'address', 'zip_code', 'city', 'price', 'sale_type', 'home_type', 'bedrooms', 'bathrooms', 'surface', 'photo_main', 'slug', 'publish_date')

class listingDetailSerializer(serializers.ModelSerializer):
    publish_date = serializers.DateField(format='%d/%m/%Y')

    class Meta:
        model = Listing
        fields = '__all__'
        lookup_field = 'slug'