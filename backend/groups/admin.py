from django.contrib import admin

# Register your models here.

from groups.models import GroupModel, GroupMessage


class GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "admin", "image", "last_message_timestamp",'created_at','updated_at')
    search_fields = ("name",)
    list_filter = ("admin",)
    readonly_fields = ('created_at','updated_at','admin')


admin.site.register(GroupModel, GroupAdmin)
admin.site.register(GroupMessage)