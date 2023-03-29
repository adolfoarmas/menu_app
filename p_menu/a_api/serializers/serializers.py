from rest_framework import serializers
from a_menu.models import Dish, DishCategory
from django.contrib.auth import get_user_model
from a_users.models import UserProfile
from drf_extra_fields.fields import Base64ImageField
from rest_framework.parsers import MultiPartParser


class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= get_user_model()
        fields = ('id', 'email', 'username', 'name', 'is_active', 'is_staff' )


class DishSerializer(serializers.ModelSerializer):

    # image = serializers.FileField()
    parser_classes = (MultiPartParser,)

    class Meta:
        model = Dish
        # fields = '__all__'
        fields = ['id', 'url', 'name', 'description', 'date', 'category', 'observation', 'image_url', 'image', 'created_by', 'price', 'currency']


    def validate_image(self, value):

        # Ensure that the image is not too large
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError('Image size cannot exceed 5MB.')
        return value


class DishCategorySerializer(serializers.ModelSerializer):
    # created_by = serializers.HyperlinkedRelatedField(
    #     many=False,
    #     view_name='user-detail',
    #     queryset=get_user_model().objects.all() #provide queryset argument when we need the hyperlinkedrelatedfield to be writable
    #     )
    # dishes = serializers.HyperlinkedRelatedField(many=True, view_name='dish-detail', read_only=True)
    dishes = DishSerializer(many=True, read_only=True)
    
    class Meta:
        model = DishCategory
        fields = ('id', 'url', 'name','description', 'created_by', 'dishes',)