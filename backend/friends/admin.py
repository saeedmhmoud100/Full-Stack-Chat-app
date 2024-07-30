from django.contrib import admin

# Register your models here.


from .models import FriendList, FriendRequest

admin.site.register(FriendList)
admin.site.register(FriendRequest)