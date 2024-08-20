from django.contrib import admin

# Register your models here.

from groups.models import GroupModel, GroupMessage, GroupMessageStatus


class GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "admin", "image", "last_message_timestamp",'created_at','updated_at')
    search_fields = ("name",)
    list_filter = ("admin",)
    readonly_fields = ('created_at','updated_at','admin')


admin.site.register(GroupModel, GroupAdmin)


class GroupMessageStatusInline(admin.TabularInline):
    model = GroupMessageStatus
    extra = 0

    readonly_fields = ['user', 'read', 'read_at']

class GroupMessageAdmin(admin.ModelAdmin):
    list_display = ("group", "user", "message", "timestamp",'created_at','updated_at')
    search_fields = ("group",)
    list_filter = ("user",)
    readonly_fields = ('created_at','updated_at')

    inlines = [GroupMessageStatusInline]

admin.site.register(GroupMessage, GroupMessageAdmin)