from rest_framework import serializers

from accounts.serializers import SimpleUserDataSerializer
from public_chat.models import PublicChatMessageModel


class PublicChatMessagesSerializer(serializers.Serializer):
    message = serializers.CharField()
    user = SimpleUserDataSerializer()
    timestamp = serializers.CharField()
    room = serializers.CharField()
    class Meta:
        fields = ['message','user','timestamp','room']
        model = PublicChatMessageModel