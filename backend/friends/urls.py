from django.urls import path
from friends.views import GetUserDataView, SearchUserView

urlpatterns = [
    path('<int:id>/', GetUserDataView.as_view(), name='get_user_data'),
    path('search', SearchUserView.as_view(), name='search_user'),

]