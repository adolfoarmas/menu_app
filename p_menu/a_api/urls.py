#from xml.etree.ElementInclude import include
from django import views
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView)

from . import views

router = DefaultRouter()
# router.register('dishes', views.DishViewSet)
# router.register('categories', views.DishCategoryList)
# router.register('profile', views.UserProfileViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path("users/", views.UserList.as_view(), name='user-list'),
    path("users/<int:pk>", views.UserDetail.as_view(), name='user-detail'),
    path('dishCategory/', views.DishCategoryList.as_view(), name='dishcategory-list'),
    path('dishCategory/<int:pk>/', views.DishCategoryDetail.as_view(), name='dishcategory-detail'),
    path('dishes/', views.DishList.as_view(), name='dish-list'),
    path('dishes/<int:pk>/', views.DishDetail.as_view(), name='dish-detail'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/redoc', SpectacularRedocView.as_view(), name='redoc'),
    path('api/schema/swager-ui', SpectacularSwaggerView.as_view(), name='swager-ui'),
    # path('users/', views.UserList.as_view()),
    # path('users/<int:pk>/', views.UserDetail.as_view()),
    # path('logout/', views.UserLogoutApiView.as_view()),
 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

print(settings.MEDIA_URL)