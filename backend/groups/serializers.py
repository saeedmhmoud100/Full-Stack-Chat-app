from django.contrib.humanize.templatetags import humanize
from rest_framework import serializers

from accounts.serializers import SimpleUserDataSerializer
from django.conf import settings

from groups.models import GroupModel


class GroupMessageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user_id = serializers.SerializerMethodField()
    message = serializers.CharField()
    timestamp = serializers.SerializerMethodField()
    group_id = serializers.IntegerField()
    def get_user_id(self, obj):
        return obj.user.id

    def get_timestamp(self, obj):
        return str(humanize.naturaltime(obj.timestamp))


class GroupSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    admin = SimpleUserDataSerializer()
    users = SimpleUserDataSerializer(many=True)
    image = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()
    unread_messages_count = serializers.SerializerMethodField()
    def get_image(self, obj):
        return settings.HOST_URL + obj.image.url

    def get_messages(self, obj):
        return GroupMessageSerializer(obj.get_group_messages(), many=True).data

    def get_unread_messages_count(self, obj):
        return obj.get_unread_messages_count(self.context['user'])


class GroupCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    image = serializers.ImageField(required=False)
    users = serializers.ListField(child=serializers.IntegerField(), required=False)
    admin = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = GroupModel
        fields = ['name', 'description', 'image', 'users', 'admin']