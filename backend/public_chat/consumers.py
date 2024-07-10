import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from rest_framework.renderers import JSONRenderer

from public_chat.models import PublicChatModel
from public_chat.serializers import PublicChatSerializer


class PublicChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = f"public_chat"
        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        self.accept()
        data = PublicChatSerializer(PublicChatModel.objects.all(),many=True).data
        self.send(text_data=json.dumps(json.dumps(data)))


    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": message}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        async_to_sync(self.send)(text_data=json.dumps({"message": message}))