import base64
import re
import uuid

import six
from django.conf import settings
from django.core.files.base import ContentFile
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import Account, get_default_profile_image
from accounts.serializers import SimpleUserDataSerializer
from private_chat.models import PrivateChatModel, PrivateChatMessageModel


class PrivateChatSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = PrivateChatModel
        fields = '__all__'

    def get_user(self, obj):
        request_user = self.context['request'].user
        if obj.user1 == request_user:
            return SimpleUserDataSerializer(obj.user2,context={'request':self.context['request']}).data
        return SimpleUserDataSerializer(obj.user1,context={'request':self.context['request']}).data


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