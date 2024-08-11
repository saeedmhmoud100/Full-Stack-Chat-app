from django.utils import timezone

from django.conf import settings
from django.db import models
from project.utilities.models import BaseModel


# Create your models here.


class PrivateChatModel(BaseModel):
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='ChatParticipant',
        related_name='private_chats'
    )
    created_at = models.DateTimeField(auto_now_add=True)
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


    @classmethod
    def get_chat_between_users(cls, user1, user2):
        return cls.objects.filter(
            users=user1
        ).filter(
            users=user2
        ).distinct().first()

    def get_current_user(self, user):
        return self.participants.filter(user=user).first().user

    def get_other_user(self, user):
        return self.participants.exclude(user=user).first().user

    def make_all_messages_as_read(self, user):
        PrivateChatMessageReadStatus.make_all_messages_as_read(user, self)

    def get_unread_messages_count(self, user):
        return PrivateChatMessageReadStatus.get_unread_messages_count(user, self)

class ChatParticipant(BaseModel):
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


class PrivateChatMessageModel(BaseModel):
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


        # Make the message as read for the user who sent the message
        self.message_statuses.create(
            user=self.user,
            is_read=True,
            read_at=timezone.now()
        )

        # Make the message as unread for the other user
        other_user = self.chat.get_other_user(self.user)
        self.message_statuses.create(
            user=other_user,
            is_read=(other_user.get_current_chat_room() == self.chat)
        )



class PrivateChatMessageReadStatus(BaseModel):
    message = models.ForeignKey(PrivateChatMessageModel, on_delete=models.CASCADE, related_name='message_statuses')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='message_statuses')
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {'Read' if self.is_read else 'Unread'}"

    @classmethod
    def make_all_messages_as_read(cls, user, chat):
        cls.objects.filter(
            user=user,
            message__chat=chat
        ).update(
            is_read=True,
            read_at=timezone.now()
        )

    @classmethod
    def get_unread_messages_count(cls, user,chat):
        return cls.objects.filter(
            message__chat=chat,
            user=user,
            is_read=False
        ).count()
