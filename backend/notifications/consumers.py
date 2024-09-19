import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.utils import timezone

from notifications.serializers import NotificationSerializer
from private_chat.models import PrivateChatModel


class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']

        self.room_group_name = f'notification_{self.user.id}'

        if self.user.is_anonymous:
            self.close()
            return None

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        serializer = NotificationSerializer(self.user.get_notifications(), many=True).data
        data = {
            'all_notifications': serializer,
            'unseen_notifications_count': self.user.get_unseen_notifications_count()
        }
        self.send(text_data=json.dumps((
            {
                'type': 'all_notifications',
                'data': data
            }
        )))


