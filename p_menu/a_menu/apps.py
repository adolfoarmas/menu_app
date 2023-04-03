from django.apps import AppConfig


class AMenuConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'a_menu'

    # def ready(self):
    #     import a_menu.signals
