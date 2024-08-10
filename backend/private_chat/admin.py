from django.contrib import admin


from .models import PrivateChatModel, PrivateChatMessageModel




class PrivateChatModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at']
    list_filter = ['users__username']
    search_fields = ['users__username']

admin.site.register(PrivateChatModel, PrivateChatModelAdmin)
admin.site.register(PrivateChatMessageModel)