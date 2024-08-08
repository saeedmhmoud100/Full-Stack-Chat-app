import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from accounts.serializers import SimpleUserDataSerializer
from friends.models import FriendList
from private_chat.models import PrivateChatModel
from private_chat.serializers import PrivateChatMessageSerializer


class PrivateChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        room_id = self.scope['url_route']['kwargs']['room_id']
        self.room = PrivateChatModel.objects.get(id=room_id)
        self.user = self.scope['user']
        if self.user == self.room.user1:
            self.user2 = self.room.user2
        else:
            self.user2 = self.room.user1

        self.room_group_name = f'private_chat_{room_id}'
        if not (self.room.user1 == self.user or self.room.user2 == self.user) or not (self.user in self.user2.friend_list.friends.all()):
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
                'user_data': SimpleUserDataSerializer(self.user2,request=self.scope['user']).data,
            }
        }))


    def disconnect(self, close_code):
        self.close()

    # def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']
    #     room_id = text_data_json['room_id']
    #
    #     async_to_sync(self.channel_layer.group_send)(
    #         room_id,
    #         {
    #             'type': 'chat_message',
    #             'message': message,
    #             'username': self.user.username
    #         }
    #     )



