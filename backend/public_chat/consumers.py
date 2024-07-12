import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from rest_framework.renderers import JSONRenderer

from public_chat.models import PublicChatMessagesModel, PublicChatModel
from public_chat.serializers import PublicChatSerializer


class PublicChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = f"public_chat"
        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        self.accept()

        users_count = PublicChatModel.objects.first().increase_users_count()
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "online_users_count", 'count': users_count}
        )


        data = {'type':'all_messages','data':PublicChatSerializer(PublicChatModel.objects.first().messages.all(), many=True).data}
        self.send(text_data=json.dumps(data))

    def disconnect(self, close_code):
        users_count = PublicChatModel.objects.first().decrease_users_count()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "online_users_count",'count':users_count}
        )
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        Type = text_data_json["type"]
        user_id = text_data_json["user_id"]
        if Type == 'add_message':
            msg = self.create_new_message(message,user_id)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "add_message", "message": msg}
            )



    def create_new_message(self, message,user_id):
        msg = PublicChatModel.objects.first().messages.create(message=message, user_id=user_id)
        return msg

    def add_message(self, event):
        message = event["message"]
        data = {"type": "add_message","message": PublicChatSerializer(message, many=False).data}
        async_to_sync(self.send(json.dumps(data)))


    def online_users_count(self,data):
        self.send(text_data=json.dumps(data))