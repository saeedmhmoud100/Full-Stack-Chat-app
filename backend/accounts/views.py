from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from accounts.models import Account
from accounts.serializers import CreateAccountSerializer


# Create your views here.


class CreateAccountView(CreateAPIView):
    serializer_class = CreateAccountSerializer
    queryset = Account.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)