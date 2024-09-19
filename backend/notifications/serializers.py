from django.contrib.humanize.templatetags import humanize
from rest_framework import serializers

from accounts.serializers import SimpleUserDataSerializer
from django.conf import settings

from groups.models import GroupModel


class NotificationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    sender = SimpleUserDataSerializer()
    timestamp = serializers.SerializerMethodField()
    notification_type = serializers.CharField(read_only=True)
    text_preview = serializers.CharField(read_only=True)
    is_seen = serializers.BooleanField(read_only=True)
    created = serializers.SerializerMethodField()

    def get_created(self, obj):
        return humanize.naturaltime(obj.timestamp)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['sender'] = SimpleUserDataSerializer(instance.sender).data
        return ret

    def get_timestamp(self, obj):
        return humanize.naturaltime(obj.timestamp)
