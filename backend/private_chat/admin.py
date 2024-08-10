from django.contrib import admin


from .models import PrivateChatModel, PrivateChatMessageModel, PrivateChatMessageReadStatus


class ChatParticipantInline(admin.TabularInline):
    model = PrivateChatModel.users.through



class PrivateChatModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at']
    list_filter = ['users__username']
    search_fields = ['users__username']

    inlines = [ChatParticipantInline]



class PrivateChatMessageModelStatusInline(admin.TabularInline):

    model = PrivateChatMessageReadStatus
    extra = 1
    max_num = 2

    readonly_fields = ['user', 'message', 'is_read', 'read_at']


class PrivateChatMessageModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'chat', 'created_at']
    list_filter = ['chat']
    search_fields = ['user__username', 'chat__id']
    list_display_links = ['id', 'user']

    inlines = [PrivateChatMessageModelStatusInline]


admin.site.register(PrivateChatModel, PrivateChatModelAdmin)
admin.site.register(PrivateChatMessageModel, PrivateChatMessageModelAdmin)