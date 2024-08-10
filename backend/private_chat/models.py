from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError
from django.db.models import Q


# Create your models here.


class PrivateChatModel(models.Model):
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='ChatParticipant',
        related_name='private_chats'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    last_message_timestamp = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        usernames = ", ".join([user.username for user in self.users.all()])
        return f"Chat between {usernames}"

    @property
    def user1(self):
        return self.users.first()
    @property
    def user2(self):
        return self.users.last()


class ChatParticipant(models.Model):
    chat = models.ForeignKey(
        PrivateChatModel,
        on_delete=models.CASCADE,
        related_name='participants'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='chat_participants'
    )
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('chat', 'user')

    def __str__(self):
        return f"{self.user.username} in chat {self.chat.id}"


class PrivateChatMessageModel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    chat = models.ForeignKey(PrivateChatModel, on_delete=models.CASCADE, related_name="messages")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.chat}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.chat.last_message_timestamp = self.timestamp
        self.chat.save()


class PrivateChatMessageReadStatus(models.Model):
    message = models.ForeignKey(PrivateChatMessageModel, on_delete=models.CASCADE, related_name='message_statuses')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='message_statuses')
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {'Read' if self.is_read else 'Unread'}"