from django.contrib import admin

# Register your models here.

from public_chat.models import PublicChatMessagesModel, PublicChatModel

admin.site.register(PublicChatMessagesModel)
admin.site.register(PublicChatModel)