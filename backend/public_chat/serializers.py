from rest_framework import serializers

from public_chat.models import PublicChatRoomMessage


class PublicChatMessagesSerializer(serializers.Serializer):
    message = serializers.CharField()
    user = serializers.CharField()
    timestamp = serializers.CharField()
    room = serializers.CharField()
    class Meta:
        fields = ['message','user','timestamp','room']
        model = PublicChatRoomMessage