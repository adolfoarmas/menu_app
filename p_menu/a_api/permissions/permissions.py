from rest_framework import permissions

# class IsAuthenticatedUser(permissions.BasePermission):

    # def has_permission(self, request, view):
    #     if request.user.is_authenticated:
    #         return True
    #     return False

class IsAuthenticatedUserOrReadOnlyUser(permissions.BasePermission):

    def has_permission(self, request, view):

        user = request.user

        if user.is_authenticated and user.is_staff:
            return True

        if user.is_authenticated and request.method in permissions.SAFE_METHODS:
            return True

        return False

class IsAuthenticatedUserOrReadOnlyMenu(permissions.BasePermission):

    def has_permission(self, request, view):

        user = request.user
        if user.is_authenticated:
            return True

        return False