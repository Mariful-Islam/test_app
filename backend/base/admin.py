from django.contrib import admin
from .models import Profile, Contact


# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'phone_number')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Contact)

