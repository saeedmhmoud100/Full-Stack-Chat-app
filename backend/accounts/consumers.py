import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.utils import timezone

from private_chat.models import PrivateChatModel


class AccountConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']

        self.room_group_name = f'account_{self.user.id}'

        if self.user.is_anonymous:
            self.close()
            return None

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        self.set_online_status(True)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        if self.user.is_authenticated:
            self.set_online_status(False)
        self.close()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        Type = text_data_json['type']
        if Type == 'make_online':
            if not self.user.is_online:
                self.set_online_status(True)

    def set_online_status(self, is_online):
        self.user.set_is_online(is_online)
        if not is_online:
            self.user.last_seen = timezone.now()

        friends = self.user.get_friends().filter(status__is_online=True)

        # send for friend's group list
        for friend in friends:
            async_to_sync(self.channel_layer.group_send)(
                f'private_chats_{friend.id}',
                {
                    'type': 'online_status',
                    'user_id': self.user.id,
                    'is_online': is_online
                }
            )

    def online_status(self, event):
        user_id = event['user_id']
        is_online = event['is_online']
        print(f'User {user_id} is online: {is_online}')
        self.send(text_data=json.dumps({
            'type': 'online_status',
            'data': {
                'user_id': user_id,
                'is_online': is_online
            }
        }))
