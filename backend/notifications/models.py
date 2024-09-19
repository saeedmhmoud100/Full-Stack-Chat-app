from django.contrib.contenttypes.fields import GenericForeignKey,ContentType
from django.db import models

from project.utilities.models import BaseModel


# Create your models here.


class Notification(BaseModel):
    sender = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='notifications_sent')
    receiver = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='notifications_received')
    notification_type = models.CharField(max_length=255)
    text_preview = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)

    content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f'{self.sender} {self.notification_type} {self.receiver}'

    def get_content_object_type(self):
        return str(self.content_object.get_cname)


