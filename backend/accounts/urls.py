from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)

from accounts.views import CreateAccountView, UpdateAccountImageView, AccountMeView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', CreateAccountView.as_view(), name='create_account'),
    path('update_image/', UpdateAccountImageView.as_view(), name='update_image'),
    path('me/', AccountMeView.as_view(), name='me')
]