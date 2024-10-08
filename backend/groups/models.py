from django.conf import settings
from django.db import models

from project.utilities.models import BaseModel


# Create your models here.


def group_image_path(instance, filename):
    return f"static/groups/{instance.id}/{filename}"


def get_default_group_image_paht():
    return "static/groups/group_image.png"


class GroupModel(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="groups")
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="admin_groups")
    image = models.ImageField(upload_to=group_image_path, null=True, blank=True, default=get_default_group_image_paht)
    last_message_timestamp = models.DateTimeField(null=True, blank=True,auto_now_add=True)

    def __str__(self):
        return self.name

    def get_group_messages(self):
        return self.group_messages.all().order_by("id")

    def add_users(self, users):
        self.users.add(*users)
        self.save()

    def add_user(self, user):
        self.users.add(user)
        self.save()

    def remove_user(self, user):
        self.users.remove(user)
        self.save()

    def add_message(self, user, message):
        msg = self.group_messages.create(user=user, message=message)
        self.last_message_timestamp = self.group_messages.last().timestamp
        self.save()
        return msg
    def get_unread_messages_count(self, user):
        return self.group_messages.filter(status__user=user, status__read=False).count()

class GroupMessage(BaseModel):
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, related_name="group_messages")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="group_messages")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

    def get_status(self, user):
        return self.status.get(user=user)

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        super().save(force_insert, force_update, using, update_fields)
        users = self.group.users.all()
        for user in users:
            status = GroupMessageStatus.objects.create(message=self, user=user)
            if user == self.user:
                status.read = True
                status.read_at = self.timestamp
            status.save()


class GroupMessageStatus(BaseModel):
    message = models.ForeignKey(GroupMessage, on_delete=models.CASCADE, related_name="status")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="group_message_status")
    read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user} - {self.message}"