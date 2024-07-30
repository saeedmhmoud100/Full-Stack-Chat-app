from django.urls import path
from friends.views import GetUserDataView

urlpatterns = [
    path('<int:id>/', GetUserDataView.as_view(), name='get_user_data'),

]