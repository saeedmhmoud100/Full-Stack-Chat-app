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

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.close()

    def receive(self, text_data):
        data = json.loads(text_data)
        if data['type'] == 'make_seen':
            self.user.get_notifications().update(is_seen=True)
            # self.send(text_data=json.dumps({
            #     'type': 'all_notifications',
            #     'data': {
            #         'all_notifications': NotificationSerializer(self.user.get_notifications(), many=True).data,
            #         'unseen_notifications_count': 0
            #     }
            # }))

    def new_notification(self, event):
        notification = event['notification']
        self.send(text_data=json.dumps({
            'type': 'new_notification',
            'data': notification
        }))

    def delete_notification(self, event):
        notification_id = event['notification_id']
        self.send(text_data=json.dumps({
            'type': 'delete_notification',
            'data': notification_id
        }))
