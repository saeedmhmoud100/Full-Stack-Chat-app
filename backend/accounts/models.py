from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


def get_profile_image_filepath(self, filename):
    return f'static/accounts/profile_images/{self.pk}/profile_image.png'


def get_default_profile_image():
    return "static/accounts/default_profile_image.png"


class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        if not username:
            raise ValueError('The Username must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
        return self.create_user(email, username, password, **extra_fields)


class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    profile_image = models.ImageField(max_length=255, upload_to=get_profile_image_filepath, null=True, blank=True,
                                      default=get_default_profile_image)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def set_current_chat_room(self, room):
        self.status.set_current_chat_room(room)

    def remove_current_chat_room(self):
        self.status.remove_current_chat_room()

    def get_current_chat_room(self):
        return self.status.get_current_chat_room()

    def set_is_online(self, is_online):
        self.status.is_online = is_online
        self.status.save()

    @property
    def is_online(self):
        return self.status.is_online

    def get_friends(self):
        return self.friend_list.friends.all()

class UserStatus(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="status")
    is_online = models.BooleanField(default=False)
    last_seen = models.DateTimeField(null=True, blank=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    current_chat_room = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f"{self.user.username} - {'Online' if self.is_online else 'Offline'}"

    def set_current_chat_room(self, room):
        if room:
            self.content_type = ContentType.objects.get_for_model(room)
            self.object_id = room.id
            self.save()

    def remove_current_chat_room(self):
        self.content_type = None
        self.object_id = None
        self.save()

    def get_current_chat_room(self):
        if self.content_type is not None:
            return self.content_type.get_object_for_this_type(id=self.object_id)
        return None