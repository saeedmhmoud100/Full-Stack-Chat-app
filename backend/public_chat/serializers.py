from rest_framework import serializers

from public_chat.models import PublicChatModel


class PublicChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicChatModel
        fields = '__all__'
