from django.db import models
from django.utils import timezone
from django.core.files.uploadedfile import InMemoryUploadedFile
from a_users.models import UserProfile
from django.urls import reverse
from PIL import Image
from django.conf import settings
from io import BytesIO

# Create your models here.
class DishCategory(models.Model):
    """
    This model represents the Dish category
    """
    name = models.CharField(max_length=20, blank=True, unique=True)
    description = models.CharField(max_length=100, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = ('Dish Category')
        verbose_name_plural = ('Dish Categories')

# class DishManager(models.Manager):
#     def get_dishes_by_category(self):
#         dishes = Dish.objects.all()
#         dishes_by_category = dishes.category.all()
#         return dishes_by_category


class Dish(models.Model):
    """
    Dishes registered by restorant allowed users are represented by this model
    """
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=200)
    date = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(DishCategory, related_name='dishes', on_delete=models.CASCADE)
    observation = models.TextField(blank=True)
    image = models.FileField(upload_to='media')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_by', on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    currency = models.CharField(default='USD', max_length=3)


    def get_absolute_url(self):
        return reverse('', kwargs={'pk': self.pk})
   
    @property
    def image_url(self):
        return f"https://res.cloudinary.com/dc3xqdidh/{self.image}"
    
   
    def save(self, *args, **kwargs):
        if self.image:
            #Resize original incoming dish image
            #Open original image using Pillow.Image class
            img = Image.open(self.image)
            img = img.resize((300, 300))
            #Save the resized image in a BytesIO object
            output = BytesIO()
            img.save(output, format='JPEG')
            #move the pointer at the begining of output before pass to InMemoryUploadedFile
            output.seek(0) 
            #Set the content of the file field to the resized image
            self.image = InMemoryUploadedFile(
                output,
                'ImageField',
                f"{self.image.name.split('.')[0]}.jpg",
                'image/jpeg',
                output.getbuffer().nbytes,
                None
            )
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = ('Dishes')

    def __str__(self):
        return self.name
    



