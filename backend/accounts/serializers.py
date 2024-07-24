import base64
import re
import uuid

import six
from django.core.files.base import ContentFile
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import Account


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.username
        token['email'] = user.email
        token['image'] = user.profile_image.url

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