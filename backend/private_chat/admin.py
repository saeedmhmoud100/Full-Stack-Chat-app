from django.contrib import admin


from .models import PrivateChatModel, PrivateChatMessageModel




class PrivateChatModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user1', 'user2', 'created_at']
    list_filter = ['user1', 'user2']
    search_fields = ['user1', 'user2']

admin.site.register(PrivateChatModel, PrivateChatModelAdmin)
admin.site.register(PrivateChatMessageModel)