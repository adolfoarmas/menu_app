#from django.contrib.auth.models import User
import os
from django import views
from a_users.models import UserProfile
from django.http import JsonResponse
from django.shortcuts import render
from a_menu.models import Dish, DishCategory
from rest_framework import generics, permissions, viewsets, filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .permissions.permissions import IsAuthenticatedUserOrReadOnlyUser, IsAuthenticatedUserOrReadOnlyMenu
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from django.conf import settings


#from rest_framework.settings import api_settings

from a_api.serializers.serializers import UserProfileSerializer

from .serializers.serializers import DishSerializer, DishCategorySerializer


class DishList(generics.ListCreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category',]

class DishDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyMenu,)
    serializer_class = DishSerializer
    queryset = Dish.objects.all()
    """
    def put(self, request, pk):
        file = request.data.get('image')
        if file:
            #if image comes in request
            file_name = file.name
            file_path = os.path.join(settings.MEDIA_ROOT, file_name)

            if not file_path.startswith(os.path.abspath(settings.MEDIA_ROOT)):
                return Response('invalid file path', status=status.HTTP_400_BAD_REQUEST)
            
            # # Checking if file exists
            # if not os.path.exists(file_path):
            #     return Response('File not found', status=status.HTTP_404_NOT_FOUND)
            
            # Update the file
            with open(file_path, 'wb') as f:
                f.write(request.FILES['image'].read())

        instance = Dish.objects.get(pk=pk)
        serializer = DishSerializer(instance=instance, data=request.data, context={'request':request}, partial=True)
        if serializer.is_valid():
            print('serializer is valid')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print('serializer is not valid')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        """
    
class DishCategoryList(generics.ListCreateAPIView):
    queryset = DishCategory.objects.all()
    serializer_class = DishCategorySerializer

class DishCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyMenu,)
    queryset = DishCategory.objects.all()
    serializer_class = DishCategorySerializer

class UserList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyUser,)
    queryset = get_user_model().objects.all()
    serializer_class = UserProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username',]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyUser,)
    queryset = get_user_model().objects.all()
    serializer_class = UserProfileSerializer
    
