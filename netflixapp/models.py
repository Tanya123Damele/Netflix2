from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
AGE_CHOICES = (
    ('All', 'All'),
    ('Kids', 'Kids'),
)
class CustomUser(AbstractUser):
    profiles= models.ManyToManyField('Profile',blank=True)

class Profile(models.Model):
    name=models.CharField(max_length=100)
    age_limit=models.CharField(choices=AGE_CHOICES,max_length=10)
    uuid=models.UUIDField(default=uuid.uuid4)
    def __str__(self) -> str:
        return self.name
class Contact(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    message=models.TextField()
    added_on=models.DateTimeField(auto_now_add=True)
    is_approved=models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return self.name
    class Meta:
        verbose_name_plural="Contact Table"




