from django.db import models
from django.utils.timezone import now
from realtors.models import Realtor
from  PIL import Image
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit

class Listing(models.Model):
    
    class SaleType(models.TextChoices):
        FOR_SALE = 'Acheter'
        FOR_RENT = 'Louer'

    class HomeType(models.TextChoices):
        HOUSE = 'Maison'
        APPARTMENT = 'Appartement'

    realtor = models.ForeignKey(Realtor, on_delete=models.PROTECT)
    slug = models.CharField(max_length=200, unique=True)
    title = models.CharField(max_length=150)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    description = models.TextField(blank=True)
    sale_type = models.CharField(max_length=50, choices=SaleType.choices, default=SaleType.FOR_SALE)
    price = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    home_type = models.CharField(max_length=20, choices=HomeType.choices, default=HomeType.HOUSE)
    surface = models.IntegerField()
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_3 = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_4 = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    is_published = models.BooleanField(default=True)
    list_date = models.DateTimeField(default=now, blank=True)

    photo_main_thumbnail = ImageSpecField(
    source='photo_main',
    processors=[ResizeToFit(500, 250)],
    format='JPEG',
    options={'quality': 90}
    )

    def __str__(self):
        return self.title

