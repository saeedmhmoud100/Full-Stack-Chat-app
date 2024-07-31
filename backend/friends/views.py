from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.generics import RetrieveAPIView, ListAPIView
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


class SearchUserView(ListAPIView):
    serializer_class = UserSerializer


    def get_queryset(self):
        query = self.request.query_params.get('q')
        if query:
            return get_user_model().objects.filter(
                Q(username__icontains=query) | Q(email__icontains=query)
            ).distinct().exclude(id=self.request.user.id)
        return get_user_model().objects.none()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context