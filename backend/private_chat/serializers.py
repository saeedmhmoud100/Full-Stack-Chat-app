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
from private_chat.models import PrivateChatModel


class PrivateChatSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = PrivateChatModel
        fields = '__all__'

    def get_user(self, obj):
        request_user = self.context['request'].user
        if obj.user1 == request_user:
            return SimpleUserDataSerializer(obj.user2).data
        return SimpleUserDataSerializer(obj.user1).data
