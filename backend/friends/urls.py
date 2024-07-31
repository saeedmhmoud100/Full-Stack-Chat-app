from django.urls import path
from friends.views import GetUserDataView, SearchUserView, send_friend_request, cancel_friend_request, \
    accept_friend_request, decline_friend_request

urlpatterns = [
    path('<int:id>/', GetUserDataView.as_view(), name='get_user_data'),
    path('search', SearchUserView.as_view(), name='search_user'),


    path('send_friend_request/<int:id>/', send_friend_request, name='send_friend_request'),
    path('cancel_friend_request/<int:id>/', cancel_friend_request, name='cancel_friend_request'),

    path('accept_friend_request/<int:id>/', accept_friend_request, name='accept_friend_request'),
    path('decline_friend_request/<int:id>/', decline_friend_request, name='decline_friend_request'),
]