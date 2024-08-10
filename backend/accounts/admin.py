from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.


from .models import Account, UserStatus


class UserStatusAdmin(admin.TabularInline):
    model = UserStatus
    readonly_fields = ('user','is_online','last_seen')
    extra = 1
    max_num = 1

    def has_add_permission(self, request, obj):
        return False



class AccountAdmin(UserAdmin):
    list_display = ('id', 'email', 'username', 'date_joined', 'last_login', 'is_admin', 'is_active')
    search_fields = ('email', 'username')
    list_display_links = ('email', 'id')
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

    inlines = [UserStatusAdmin]


admin.site.register(Account, AccountAdmin)
