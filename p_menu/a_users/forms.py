from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import UserProfile

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = UserProfile
        fields = UserCreationForm.Meta.fields + ("name",)

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = UserProfile
        fields = UserChangeForm.Meta.fields