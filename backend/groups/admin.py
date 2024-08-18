from django.contrib import admin

# Register your models here.

from groups.models import GroupModel, GroupMessage

admin.site.register(GroupModel)
admin.site.register(GroupMessage)