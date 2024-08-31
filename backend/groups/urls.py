from django.urls import path
from groups.views import  get_user_groups, CreateGroupView

urlpatterns = [
    path('create_group', CreateGroupView.as_view(), name='create_group'),
    path('get_user_groups', get_user_groups, name='get_user_groups'),
]