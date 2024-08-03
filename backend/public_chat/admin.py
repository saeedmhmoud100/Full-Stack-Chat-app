from django.contrib import admin

# Register your models here.

from public_chat.models import PublicChatRoomMessage, PublicChatRoom

admin.site.register(PublicChatRoomMessage)
admin.site.register(PublicChatRoom)