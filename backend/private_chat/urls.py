from django.urls import path
from friends.views import GetUserDataView, SearchUserView, send_friend_request, cancel_friend_request, \
    accept_friend_request, decline_friend_request, unfriend, get_friends_requests, get_user_friends, \
    get_friend_requests_you_sent, get_mutual_friends
from private_chat.views import get_all_private_chats

urlpatterns = [
    path('get_all_private_chats/', get_all_private_chats, name='get_all_private_chats'),
]