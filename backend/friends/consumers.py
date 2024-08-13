import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.utils import timezone

from private_chat.models import PrivateChatModel


class FriendConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']

        self.room_group_name = f'friends_online_status_{self.user.id}'

        if self.user.is_anonymous:
            self.close()
            return None

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.close()

    def online_status(self, event):
        user_id = event['user_id']
        is_online = event['is_online']
        self.send(text_data=json.dumps({
            'type': 'online_status',
            'data': {
                'user_id': user_id,
                'is_online': is_online
            }
        }))
