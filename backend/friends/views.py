from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response

from friends.models import FriendRequest
from friends.serializers import UserSerializer, FriendRequestSerializer, FriendRequestYouSentSerializer
from accounts.serializers import SimpleUserDataSerializer


# Create your views here.


class GetUserDataView(RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'id'
    queryset = get_user_model().objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"user": self.request.user})
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
        context.update({"user": self.request.user})
        return context


@api_view(['POST'])
def send_friend_request(request, id):
    from_user = request.user
    to_user = get_user_model().objects.get(id=id)
    friend_request, created = FriendRequest.objects.get_or_create(
        from_user=from_user,
        to_user=to_user
    )
    if not created:
        friend_request.is_active = True
        friend_request.save()
    return Response(data={},  status=status.HTTP_200_OK)


@api_view(['POST'])
def cancel_friend_request(request, id):
    to_user = get_user_model().objects.get(id=id)
    friend_request = FriendRequest.objects.get(to_user=to_user, from_user=request.user)
    if friend_request:
        friend_request.cancel()

    return Response(data={},  status=status.HTTP_200_OK)


@api_view(['POST'])
def accept_friend_request(request, id):
    to_user = request.user
    friend_request = FriendRequest.objects.get(to_user=to_user, from_user_id=id, is_active=True)
    if friend_request:
        friend_request.accept()
    return Response(data={},  status=status.HTTP_200_OK)


@api_view(['POST'])
def decline_friend_request(request, id):
    to_user = request.user
    friend_request = FriendRequest.objects.get(to_user=to_user, from_user_id=id, is_active=True)
    if friend_request:
        friend_request.decline()
    return Response(data={},  status=status.HTTP_200_OK)


@api_view(["POST"])
def unfriend(request, id):
    to_user = get_user_model().objects.get(id=id)
    from_user = request.user
    from_user.friend_list.unfriend(to_user)
    return Response(data={},  status=status.HTTP_200_OK)


@api_view(["GET"])
def get_friends_requests(request):
    friend_requests = FriendRequest.objects.filter(to_user=request.user, is_active=True)
    return Response(data={"friend_requests": FriendRequestSerializer(friend_requests, many=True).data},
                    status=status.HTTP_200_OK)


@api_view(["GET"])
def get_user_friends(request):
    if not request.user.is_authenticated:
        return Response(data={"friends": "[]"},
                        status=status.HTTP_400_BAD_REQUEST)
    friends = request.user.friend_list.friends.all()
    return Response(data={"friends": SimpleUserDataSerializer(friends, many=True,context={'user':request.user}).data},
                    status=status.HTTP_200_OK)

@api_view(["GET"])
def get_friend_requests_you_sent(request):
    friend_requests = FriendRequest.objects.filter(from_user=request.user, is_active=True)
    return Response(data={"friend_requests_you_sent": FriendRequestYouSentSerializer(friend_requests, many=True).data},
                    status=status.HTTP_200_OK)


@api_view(["GET"])
def get_mutual_friends(request, id):
    user = get_user_model().objects.get(id=id)
    mutual_friends = request.user.friend_list.friends.all().intersection(user.friend_list.friends.all())
    return Response(data={"mutual_friends": SimpleUserDataSerializer(mutual_friends, many=True,context={'request':request}).data},
                    status=status.HTTP_200_OK)