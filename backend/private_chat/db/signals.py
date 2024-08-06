from django.conf import settings
from django.db.models import Q

from friends.models import FriendList, FriendRequest
from django.db.models.signals import post_save

from private_chat.models import PrivateChatModel


def create_private_chat_when_be_friends(sender, instance, created, **kwargs):
    if not instance.is_active:
        user1 = instance.to_user
        user2 = instance.from_user
        if FriendList.objects.get(user=user1).is_mutual_friend(user2):

            obj = PrivateChatModel.objects.filter(Q(user1=user1, user2=user2) | Q(user1=user2, user2=user1))
            if not obj.exists():
                PrivateChatModel.objects.create(user1=user1, user2=user2)
            else:
                obj = obj.first()
                obj.is_active = True
                obj.save()


post_save.connect(create_private_chat_when_be_friends, sender=FriendRequest)


def deactivate_private_chat_when_unfriend(sender, instance, removee, **kwargs):
    user1 = instance.user
    if removee:
        user2 = removee
        obj = PrivateChatModel.objects.filter(Q(user1=user1, user2=user2) | Q(user1=user2, user2=user1))
        if obj.exists():
            obj = obj.first()
            obj.is_active = False
            obj.save()


post_save.connect(deactivate_private_chat_when_unfriend, sender=FriendList)
