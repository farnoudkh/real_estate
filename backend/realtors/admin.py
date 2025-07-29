from django.contrib import admin
from .models import Realtor

class RealtorAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'date_hired')
    list_display_links = ('id', 'first_name', 'last_name')
    search_fields = ('first_name', 'last_name', )
    list_per_page = 25

admin.site.register(Realtor, RealtorAdmin)