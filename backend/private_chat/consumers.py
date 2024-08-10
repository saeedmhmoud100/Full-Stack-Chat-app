import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from accounts.serializers import SimpleUserDataSerializer
from private_chat.models import PrivateChatModel
from private_chat.serializers import PrivateChatMessageSerializer


class PrivateChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        room_id = self.scope['url_route']['kwargs']['room_id']
        self.room = PrivateChatModel.objects.get(id=room_id)
        self.user = self.scope['user']
        self.user2 = self.room.get_other_user(self.user)
        self.room_group_name = f'private_chat_{room_id}'
        if self.user.is_anonymous or self.room.get_chat_between_users(self.user,self.user2) is None or not (self.user in self.user2.friend_list.friends.all()):
            print('not allowed')
            self.close()
            return None

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

        self.send(text_data=json.dumps({
            'type':'connected',
            "data":{
                'all_messages': PrivateChatMessageSerializer(self.room.messages.all(),many=True).data,
                'user_data': SimpleUserDataSerializer(self.user2).data,
            }
        }))


    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.close()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        Type = text_data_json['type']

        if Type == 'new_message':
            message = text_data_json['message']
            self.create_new_message(message)

    def create_new_message(self, message):
        new_message = self.room.messages.create(user=self.user, message=message)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'broadcast_new_message',
                'message': PrivateChatMessageSerializer(new_message).data
            }
        )

    def broadcast_new_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'type': 'new_message',
            'data':{
                'message': message
            }
        }))

