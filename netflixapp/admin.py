from django.contrib import admin
from netflixapp.models import Profile,CustomUser,Contact
# Register your models here.
admin.site.register(Profile)
admin.site.register(CustomUser)
admin.site.register(Contact)
