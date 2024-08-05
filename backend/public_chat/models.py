from django.conf import settings
from django.db import models


# Create your models here.


class PublicChatModelManager(models.Manager):
    def selected(self):
        return self.get_queryset().filter(active=True).first()

class PublicChatModel(models.Model):
    title = models.CharField(max_length=100, unique=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="public_chat_rooms")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    active = models.BooleanField(default=False)

    objects = PublicChatModelManager()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not PublicChatModel.objects.filter(active=True).exists():
            self.active = True
            self.save()

    def __str__(self):
        return self.title

    def connect_user(self, user):
        is_already_user = user in self.users.all()
        if not is_already_user:
            self.users.add(user)
            self.save()
        return True

    def disconnect_user(self, user):
        is_already_user = user in self.users.all()
        if is_already_user:
            self.users.remove(user)
            self.save()
            return True
        return False

    @property
    def group_name(self):
        return f"public_chat_{self.id}"


    def get_connected_users_count(self):
        return self.users.count()


class PublicChatMessageModel(models.Model):
    room = models.ForeignKey(PublicChatModel, on_delete=models.CASCADE, related_name="messages")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
