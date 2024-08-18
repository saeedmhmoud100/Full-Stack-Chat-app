from rest_framework import serializers

from accounts.serializers import SimpleUserDataSerializer
from django.conf import settings


class GroupSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    admin = SimpleUserDataSerializer()
    users = SimpleUserDataSerializer(many=True)
    image = serializers.SerializerMethodField()


    def get_image(self, obj):
        return settings.HOST_URL + obj.image.url