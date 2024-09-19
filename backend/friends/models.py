from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.db.models.signals import post_save

from notifications.models import Notification
from project.utilities.models import BaseModel


# Create your models here.


class FriendList(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="friend_list")
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)

    notifications = GenericRelation(Notification)

    def __str__(self):
        return self.user.username

    def add_friend(self, account):
        if not account in self.friends.all():
            self.friends.add(account)
            noty = self.notifications.create(
                sender=self.user,
                receiver=account,
                notification_type='friend_with',
                text_preview=f'now you are friends with {account.username}'
            )

    def remove_friend(self, account):
        if account in self.friends.all():
            self.friends.remove(account)

    def unfriend(self, removee):
        remover_friend_list = self
        remover_friend_list.remove_friend(removee)
        friends_list = FriendList.objects.get(user=removee)
        friends_list.remove_friend(self.user)
        post_save.send(sender=FriendList, instance=self, removee=removee)

    def is_mutual_friend(self, friend):
        if friend in self.friends.all():
            return True
        return False

    @property
    def get_cname(self):
        return "FriendList"


class FriendRequest(BaseModel):
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="to_user")
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="from_user")
    timestamp = models.DateTimeField(auto_now_add=True)

    notifications = GenericRelation(Notification)

    def __str__(self):
        return self.from_user.username

    def accept(self):
        user1_friend_list = FriendList.objects.get(user=self.to_user)
        user2_friend_list = FriendList.objects.get(user=self.from_user)
        user1_friend_list.add_friend(self.from_user)
        user2_friend_list.add_friend(self.to_user)
        self.is_active = False
        self.save()

    # when you cancel incoming friend request
    def decline(self):
        self.is_active = False
        self.save()

    # when you cancel a sent friend request
    def cancel(self):
        self.is_active = False
        self.save()

    @property
    def get_cname(self):
        return "FriendRequest"
