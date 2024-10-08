from django.apps import AppConfig


class PrivateChatConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "private_chat"

    def ready(self):
        import private_chat.db.signals