from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers

from accounts.serializers import SimpleUserDataSerializer
from public_chat.models import PublicChatMessageModel


class GroupSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    admin = SimpleUserDataSerializer()
    users = SimpleUserDataSerializer(many=True)
