import base64
import re
import uuid

import six
from django.conf import settings
from django.core.files.base import ContentFile
from django.db.models import Q
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import Account, get_default_profile_image
from private_chat.models import PrivateChatModel


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.username
        token['email'] = user.email

        return token


class CreateAccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.findall('[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.findall('[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.findall('[0-9]', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.findall('[^a-zA-Z0-9]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    class Meta:
        model = Account
        fields = ['email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = Account.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        user.save()
        return user


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension,)
            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class UpdateAccountImageSerializer(serializers.ModelSerializer):
    profile_image = Base64ImageField(max_length=None, use_url=True)

    class Meta:
        model = Account
        fields = ['profile_image']
        extra_kwargs = {
            'profile_image': {'required': False}
        }



class AccountMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'profile_image']
        extra_kwargs = {
            'id': {'read_only': True},
            'email': {'read_only': True},
            'username': {'read_only': True},
            'profile_image': {'read_only': True}
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if not data['profile_image']:
            data['profile_image'] =settings.HOST_URL+ get_default_profile_image()
        return data


class AccountChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is not correct.")
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not re.findall('[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.findall('[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.findall('[0-9]', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.findall('[^a-zA-Z0-9]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance

    def to_representation(self, instance):
        return {
            'name': instance.username,
            'email': instance.email
        }


class SimpleUserDataSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    private_chat_id = serializers.SerializerMethodField()
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.context['request'] = kwargs.get('context', {}).get('request', None)

    class Meta:
        model = Account
        fields = ['id', 'email', 'username', 'profile_image', 'private_chat_id','is_online']
        read_only_fields = ['email', 'username']



    def get_profile_image(self, obj):
        if obj.profile_image:
            return settings.HOST_URL + obj.profile_image.url
        return settings.HOST_URL + get_default_profile_image()

    def get_private_chat_id(self, obj):
        if 'user' in self.context:
            chat = PrivateChatModel.get_chat_between_users(self.context['user'], obj)
            return chat.id if chat else None
        return None