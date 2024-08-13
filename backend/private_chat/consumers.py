import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from accounts.serializers import SimpleUserDataSerializer
from private_chat.models import PrivateChatModel
from private_chat.serializers import PrivateChatMessageSerializer, PrivateChatSerializer


class PrivateChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        if self.user.is_anonymous:
            self.close()
            return None
        room_id = self.scope['url_route']['kwargs']['room_id']

        self.room = PrivateChatModel.objects.get(id=room_id)
        self.user = self.scope['user']
        self.user2 = self.room.get_other_user(self.user)
        self.room_group_name = f'private_chat_{room_id}'

        if self.room.get_chat_between_users(self.user, self.user2) is None or not (
                self.user in self.user2.friend_list.friends.all()):
            self.close()
            return None

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        self.user.set_current_chat_room(self.room)

        self.room.make_all_messages_as_read(self.user)

        all_chats_group_name = f'private_chats_{self.user.id}'
        async_to_sync(self.channel_layer.group_send)(
            all_chats_group_name,
            {
                'type': 'update_chat_unread_messages_count',
                'chat': {
                    'chat_id': self.room.id,
                    'unread_messages_count': self.room.get_unread_messages_count(self.user)
                },
            }
        )

        self.send(text_data=json.dumps({
            'type': 'connected',
            "data": {
                'all_messages': PrivateChatMessageSerializer(self.room.messages.all(), many=True).data,
                'user_data': SimpleUserDataSerializer(self.user2, context={'user': self.user}).data,
            }
        }))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.user.remove_current_chat_room()
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

        friend = self.room.get_other_user(self.user)
        friend_all_chats_group_name = f'private_chats_{friend.id}'
        async_to_sync(self.channel_layer.group_send)(
            friend_all_chats_group_name,
            {
                'type': 'update_chat_unread_messages_count',
                'chat': {
                    'chat_id': self.room.id,
                    'unread_messages_count': self.room.get_unread_messages_count(friend)
                },
            }
        )

    def broadcast_new_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'type': 'new_message',
            'data': {
                'message': message
            }
        }))


class AllPrivateChatsConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        if self.user.is_anonymous:
            self.close()
            return None

        self.room_group_name = f'private_chats_{self.user.id}'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        private_chats = self.user.private_chats.all().order_by('-last_message_timestamp')
        serializer = PrivateChatSerializer(private_chats, many=True, context={'user': self.user}).data
        self.send(text_data=json.dumps({
            'type': 'connected',
            "data": serializer,

        }))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.close()

    def update_chat_unread_messages_count(self, event):
        chat = event['chat']
        self.send(text_data=json.dumps({
            'type': 'update_chat_unread_messages_count',
            'data': chat
        }))

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
