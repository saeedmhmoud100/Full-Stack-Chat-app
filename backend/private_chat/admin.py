from django.contrib import admin


from .models import PrivateChatModel, PrivateChatMessageModel

admin.site.register(PrivateChatModel)
admin.site.register(PrivateChatMessageModel)