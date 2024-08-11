from rest_framework import serializers
from accounts.serializers import SimpleUserDataSerializer
from private_chat.models import PrivateChatModel, PrivateChatMessageModel


class PrivateChatSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    unread_messages_count = serializers.SerializerMethodField()
    class Meta:
        model = PrivateChatModel
        fields = '__all__'

    def get_user(self, obj):
        if 'user' in self.context:
            request_user = self.context['user']
            return SimpleUserDataSerializer(obj.get_other_user(request_user),context={'user':request_user}).data
        elif 'request' in self.context:
            request_user = self.context['request'].user
            return SimpleUserDataSerializer(obj.get_other_user(request_user),context={'request':self.context['request']}).data

    def get_unread_messages_count(self, obj):
        if 'user' in self.context:
            return obj.get_unread_messages_count(self.context['user'])


class PrivateChatMessageSerializer(serializers.Serializer):
    user_id = serializers.SerializerMethodField()
    message = serializers.CharField()
    timestamp = serializers.DateTimeField()
    class Meta:
        fields = ['message', 'user_id', 'timestamp']
        model = PrivateChatMessageModel

    def get_user_id(self, obj):
        if obj:
            return obj.user.id