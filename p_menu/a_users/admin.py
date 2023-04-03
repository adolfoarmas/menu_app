from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from a_users.forms import CustomUserChangeForm, CustomUserCreationForm
from a_users.models import UserProfile


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = UserProfile
    list_display = ["email",
                    "username",
                    "name",
                    "is_staff",
                    ]
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("name",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {"fields": ("name",)}),)


admin.site.register(UserProfile, CustomUserAdmin)
