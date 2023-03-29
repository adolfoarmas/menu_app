from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


# class UserProfileManager(AbstractUserManager):
#     """ Profle Users Manager """

#     def create_user(self, email, username, password=None):
#         """ Create new User """

#         if not email:
#             raise ValueError('Email field is mandatory for new user')
#         if not username:
#             raise ValueError('username field is mandatory for new user')
        
#         email = self.normalize_email(email)
#         user = self.model(email=email, username=username)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, username, password):
#         user = self.create_user(email, username, password)

#         user.is_superuser = True
#         user.is_staff = True
#         user.save(using=self._db)

#         return user


class UserProfile(AbstractUser):
    """ Base model for Profiles """
    name = models.CharField(null=True, blank=True, max_length=255)
    
    #objects = UserProfileManager()
    
    # def get_full_name(self):
    #     return self.name
    
    # def get_short_name(self):
    #     return self.name

    def __str__(self):
        """Representational string of user"""
        return str(self.name)

