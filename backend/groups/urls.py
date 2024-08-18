from django.urls import path
from friends.views import GetUserDataView, SearchUserView, send_friend_request, cancel_friend_request, \
    accept_friend_request, decline_friend_request, unfriend, get_friends_requests, get_user_friends, \
    get_friend_requests_you_sent, get_mutual_friends
from groups.views import create_group

urlpatterns = [
    path('create_group', create_group, name='create_group'),
]