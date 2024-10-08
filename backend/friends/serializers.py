from django.db.models import Q
from rest_framework import serializers
from accounts.models import Account, get_default_profile_image
from django.conf import settings

from friends.models import FriendRequest
from private_chat.models import PrivateChatModel


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    is_friend = serializers.SerializerMethodField()
    is_you = serializers.SerializerMethodField()
    request_from_you = serializers.SerializerMethodField()
    request_to_you = serializers.SerializerMethodField()
    private_chat_id = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'full_name', 'profile_image',
                  'is_friend', 'is_you', 'request_from_you', 'request_to_you', 'private_chat_id','is_online']
        read_only_fields = ['email', 'username']

    def get_profile_image(self, obj):
        if obj.profile_image:
            return settings.HOST_URL + obj.profile_image.url
        return settings.HOST_URL + get_default_profile_image()


    def get_full_name(self, obj):
        return obj.username

    def get_is_friend(self, obj):
        if 'request' in self.context:
            return obj.friend_list.is_mutual_friend(self.context['request'].user)
        return False

    def get_is_you(self, obj):
        if 'request' in self.context:
            return self.context['request'].user == obj
        return False

    def get_request_from_you(self, obj):
        if (self.get_is_friend(obj)):
            return False
        if 'request' in self.context:
            return FriendRequest.objects.filter(from_user=self.context['request'].user, to_user=obj,is_active=True).exists()
        return False
    def get_request_to_you(self, obj):
        if (self.get_is_friend(obj)):
            return False
        if 'request' in self.context:
            return FriendRequest.objects.filter(from_user=obj, to_user=self.context['request'].user,is_active=True).exists()
        return False

    def get_private_chat_id(self, obj):
        if 'user' in self.context:
            private_chat = PrivateChatModel.get_chat_between_users(self.context['user'], obj)
            if private_chat:
                return private_chat.id
        return None


class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer()
    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'timestamp', 'is_active']
class FriendRequestYouSentSerializer(serializers.ModelSerializer):
    to_user = UserSerializer()
    class Meta:
        model = FriendRequest
        fields = ['id', 'to_user', 'timestamp', 'is_active']


