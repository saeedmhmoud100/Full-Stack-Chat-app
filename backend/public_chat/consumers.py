import json

from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer

from public_chat.models import PublicChatModel, PublicChatMessageModel
from public_chat.serializers import PublicChatMessagesSerializer


class PublicChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = f"public_chat"
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.user = self.scope['user']
        self.room = PublicChatModel.objects.selected()
        if self.scope['user'].is_anonymous:
            self.close()
            return None

        if self.user.is_anonymous:
            self.close()
        else:
            self.accept()

        self.room.connect_user(self.user)

        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {'type': 'send_users_count'})

        data = {'type': 'all_messages',
                'data': PublicChatMessagesSerializer(PublicChatModel.objects.selected().messages.all(), many=True).data}
        self.send(text_data=json.dumps(data))

    def disconnect(self, close_code):

        self.room.disconnect_user(self.user)
        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {"type": "send_users_count"})
        self.close()

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        Type = text_data_json["type"]
        if Type == 'new_message':
            data = text_data_json["data"]
            msg = async_to_sync(self.create_new_message)(data)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "broadcast_new_message", "message_id": msg.id}
            )

    def send_users_count(self, event):
        self.send(text_data=json.dumps({'type': 'online_users_count', 'data': self.room.get_connected_users_count()}))

    @database_sync_to_async
    def create_new_message(self, data):
        msg = PublicChatMessageModel.objects.create(user=self.user, room=self.room, message=data)
        return msg





    def broadcast_new_message(self, event):
        message_id = event['message_id']
        self.send(text_data=json.dumps({'type': 'new_message', 'data': PublicChatMessagesSerializer(PublicChatMessageModel.objects.get(id=message_id),many=False).data}))
#