from .models import Listing
from geopy.geocoders import Nominatim
from django.db.models.signals import pre_save 
from django.dispatch import receiver
from geopy.exc import GeocoderTimedOut

def get_latitude_longitude(address, city, zip_code):
    geolocator = Nominatim(user_agent="real_estate_app", timeout=10)
    try:
        location = geolocator.geocode(f"{address}, {city}, {zip_code}")
        if location:
            print(f"Coordinates for {address}: {location.latitude}, {location.longitude}")
            return location.latitude, location.longitude
        else:
            print(f"Failed to get coordinates for {address}")
            return None, None
    except GeocoderTimedOut:
        print(f"Geocoding service timed out for address: {address}")
        return None, None

@receiver(pre_save, sender=Listing)
def update_lat_long(sender, instance, **kwargs):
    latitude, longitude = get_latitude_longitude(instance.address, instance.city, instance.zip_code)
    
    if latitude is not None and longitude is not None:
        instance.latitude = latitude
        instance.longitude = longitude
        print(f"Coordinates updated for {instance.address}: Latitude={latitude}, Longitude={longitude}")
    else:
        print(f"Failed to get coordinates for {instance.address}")