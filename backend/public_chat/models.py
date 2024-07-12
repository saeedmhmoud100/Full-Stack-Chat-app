from django.db import models


# Create your models here.


class PublicChatModel(models.Model):
    message = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    user_id = models.CharField(max_length=100, default="anonymous")

    def __str__(self):
        return self.message
