from django.urls import path
from friends.views import GetUserDataView, SearchUserView, send_friend_request

urlpatterns = [
    path('<int:id>/', GetUserDataView.as_view(), name='get_user_data'),
    path('search', SearchUserView.as_view(), name='search_user'),


    path('send_friend_request/<int:id>/', send_friend_request, name='send_friend_request'),
]