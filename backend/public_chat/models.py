from django.conf import settings
from django.db import models


# Create your models here.


class PublicChatRoom(models.Model):
    title = models.CharField(max_length=100, unique=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="public_chat_rooms")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def connect_user(self, user):
        is_already_user = user in self.users.all()
        if not is_already_user:
            self.users.add(user)
            self.save()
        return True

    def disconnect_user(self, user):
        is_already_user = user in self.users.all()
        if is_already_user:
            self.users.remove(user)
            self.save()
            return True
        return False

    @property
    def group_name(self):
        return f"public_chat_{self.id}"


class PublicChatRoomMessage(models.Model):
    room = models.ForeignKey(PublicChatRoom, on_delete=models.CASCADE, related_name="messages")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
