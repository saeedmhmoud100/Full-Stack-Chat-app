from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import Account
from accounts.serializers import CreateAccountSerializer, UpdateAccountImageSerializer, AccountMeSerializer, \
    AccountChangePasswordSerializer


# Create your views here.


class CreateAccountView(CreateAPIView):
    serializer_class = CreateAccountSerializer
    queryset = Account.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UpdateAccountImageView(UpdateAPIView):
    serializer_class = UpdateAccountImageSerializer
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated, ]

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        user = self.request.user
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        response.data.access = access_token
        return Response(response.data)


class AccountMeView(RetrieveAPIView):
    serializer_class = AccountMeSerializer

    def get_object(self):
        return self.request.user


class AccountChangePasswordView(UpdateAPIView):
    serializer_class = AccountChangePasswordSerializer
    permission_classes = [IsAuthenticated, ]

    def get_object(self):
        return self.request.user





def run_migrate(request):
    call_command('migrate')
    return HttpResponse("Migrations applied.")

def create_superuser(request):
    User = get_user_model()
    # Check if superuser already exists
    if not User.objects.filter(is_superuser=True).exists():
        call_command('createsuperuser', '--noinput', '--username', 'admin', '--email', 'admin@gmail.com')
        user = User.objects.get(username='admin')
        user.set_password('admin123')  # Set password programmatically
        user.save()
        return HttpResponse("Superuser created successfully.")
    else:
        return HttpResponse("Superuser already exists.")
