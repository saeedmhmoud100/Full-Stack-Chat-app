from django.conf import settings
from django.db.models.signals import post_save

from accounts.models import UserStatus


def create_user_status(sender, instance, created, **kwargs):
    if created:
        UserStatus.objects.create(user=instance)


post_save.connect(create_user_status, sender=settings.AUTH_USER_MODEL)