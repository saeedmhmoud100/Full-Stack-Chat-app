from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.


from .models import Account


class AccountAdmin(UserAdmin):
    list_display = ('id', 'email', 'username', 'date_joined', 'last_login', 'is_admin', 'is_active')
    search_fields = ('email', 'username')
    list_display_links = ('email', 'id')
    readonly_fields = ('date_joined', 'last_login')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(Account, AccountAdmin)
