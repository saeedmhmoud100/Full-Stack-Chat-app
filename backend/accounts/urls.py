from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)

from accounts.views import CreateAccountView, UpdateAccountImageView, AccountMeView, AccountChangePasswordView, \
    run_migrate, create_superuser

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', CreateAccountView.as_view(), name='create_account'),
    path('update_image/', UpdateAccountImageView.as_view(), name='update_image'),
    path('me/', AccountMeView.as_view(), name='me'),
    path('change_password/', AccountChangePasswordView.as_view(), name='change_password'),

    path('run-migrate/', run_migrate, name='run_migrate'),
    path('create-superuser/', create_superuser, name='create_superuser'),

]