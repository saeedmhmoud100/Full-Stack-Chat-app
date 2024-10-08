from django.urls import path
from friends.views import GetUserDataView, SearchUserView, send_friend_request, cancel_friend_request, \
    accept_friend_request, decline_friend_request, unfriend, get_friends_requests, get_user_friends, \
    get_friend_requests_you_sent, get_mutual_friends

urlpatterns = [
    path('<int:id>/', GetUserDataView.as_view(), name='get_user_data'),
    path('search', SearchUserView.as_view(), name='search_user'),


    path('send_friend_request/<int:id>/', send_friend_request, name='send_friend_request'),
    path('cancel_friend_request/<int:id>/', cancel_friend_request, name='cancel_friend_request'),

    path('accept_friend_request/<int:id>/', accept_friend_request, name='accept_friend_request'),
    path('decline_friend_request/<int:id>/', decline_friend_request, name='decline_friend_request'),
    path('unfriend/<int:id>/', unfriend, name='unfriend'),

    path('get_friends_requests/', get_friends_requests, name='get_friends_requests'),
    path('get_user_friends/', get_user_friends, name='get_user_friends'),
    path('get_friend_requests_you_sent/', get_friend_requests_you_sent, name='get_friend_requests_you_sent'),
    path('get_mutual_friends/<int:id>/', get_mutual_friends, name='get_mutual_friends')
]