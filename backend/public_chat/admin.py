from django.contrib import admin

# Register your models here.

from public_chat.models import PublicChatMessageModel, PublicChatModel

admin.site.register(PublicChatMessageModel)
admin.site.register(PublicChatModel)