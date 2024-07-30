from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView
from friends.serializers import UserSerializer


# Create your views here.


class GetUserDataView(RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'id'
    queryset = get_user_model().objects.all()


    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
