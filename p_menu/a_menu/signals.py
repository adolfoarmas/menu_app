from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.files.storage import default_storage
from a_menu.models import Dish
from django.core.files.base import ContentFile
import os


@receiver(pre_save, sender=Dish)
def delete_old_image(sender, instance, **kwargs):
    print("instance to edit", instance.image)
    if instance.pk:  # Check if the image instance already exists 
        old_instance = Dish.objects.get(pk=instance.pk)
        if old_instance.image and instance.image != old_instance.image:  # Check if image has been changed
            default_storage.delete(old_instance.image.path)
    
    