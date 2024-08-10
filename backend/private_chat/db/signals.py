from django.conf import settings
from django.db.models import Q

from friends.models import FriendList, FriendRequest
from django.db.models.signals import post_save

from private_chat.models import PrivateChatModel


def create_private_chat_when_be_friends(sender, instance, created, **kwargs):
    obj = PrivateChatModel.get_chat_between_users(instance.from_user, instance.to_user)
    if obj is None:
        obj = PrivateChatModel.objects.create()
        obj.users.add(instance.from_user, instance.to_user)

    if instance.from_user.friend_list.is_mutual_friend(instance.to_user):
        obj.is_active = True
        obj.save()
    else:
        obj.is_active = False
        obj.save()



post_save.connect(create_private_chat_when_be_friends, sender=FriendRequest)


def deactivate_private_chat_when_unfriend(sender, instance, removee, **kwargs):
    user1 = instance.user
    if removee and not user1.friend_list.is_mutual_friend(removee):
        obj = PrivateChatModel.get_chat_between_users(user1, removee)
        obj.is_active = False
        obj.save()


post_save.connect(deactivate_private_chat_when_unfriend, sender=FriendList)
