from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers

from accounts.serializers import SimpleUserDataSerializer
from public_chat.models import PublicChatMessageModel


class PublicChatMessagesSerializer(serializers.Serializer):
    message = serializers.CharField()
    user = SimpleUserDataSerializer()
    timestamp = serializers.SerializerMethodField()
    room = serializers.CharField()
    class Meta:
        fields = ['message','user','timestamp','room']
        model = PublicChatMessageModel

    def get_timestamp(self, obj):
        return str(naturaltime(obj.timestamp))