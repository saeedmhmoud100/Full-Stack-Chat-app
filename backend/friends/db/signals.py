from django.conf import settings

from friends.models import FriendList
from django.db.models.signals import post_save


def create_friend_list_with_user(sender, instance, created, *args, **kwargs):
    if created:
        FriendList.objects.create(user=instance)


post_save.connect(create_friend_list_with_user, sender=settings.AUTH_USER_MODEL)
