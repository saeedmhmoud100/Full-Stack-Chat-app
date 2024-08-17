from django.conf import settings
from django.db import models

from project.utilities.models import BaseModel


# Create your models here.


class GroupModel(BaseModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="groups")
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="admin_groups")
    last_message_timestamp = models.DateTimeField(null=True, blank=True)






    def __str__(self):
        return self.name

    def get_group_messages(self):
        return self.group_messages.all().order_by("timestamp")


class GroupMessage(BaseModel):
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE, related_name="group_messages")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="group_messages")
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.message