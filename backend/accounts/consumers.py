import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from accounts.serializers import SimpleUserDataSerializer
from private_chat.models import PrivateChatModel
from private_chat.serializers import PrivateChatMessageSerializer, PrivateChatSerializer


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

        self.user.set_is_online(True)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.user.set_is_online(False)
        self.close()






