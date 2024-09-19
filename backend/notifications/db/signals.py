from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save

from notifications.models import Notification
from notifications.serializers import NotificationSerializer
from django.utils.functional import Promise
from django.utils.encoding import force_str


def send_notification(sender, instance, created, **kwargs):
    if created:
        notification = instance
        if notification.receiver != notification.sender:
            notification_data = NotificationSerializer(notification).data

            for key, value in notification_data.items():
                if isinstance(value, Promise):
                    notification_data[key] = force_str(value)

            async_to_sync(get_channel_layer().group_send)(
                f'notification_{notification.receiver.id}',
                {
                    'type': 'new_notification',
                    'notification': notification_data
                }
            )


post_save.connect(send_notification, sender=Notification)