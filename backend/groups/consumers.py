import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from groups.serializers import GroupSerializer


class AllGroupsConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        if self.user.is_anonymous:
            self.close()
            return None

        self.room_group_name = f'groups_{self.user.id}'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

        groups = self.user.groups.all().order_by('-last_message_timestamp')
        serializer = GroupSerializer(groups, many=True, context={'user': self.user}).data
        self.send(text_data=json.dumps({
            'type': 'all_groups',
            "data": serializer,

        }))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.close()