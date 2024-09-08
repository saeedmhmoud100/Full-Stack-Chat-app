from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from groups.models import GroupModel
from groups.serializers import GroupSerializer, GroupCreateSerializer

# Create your views here.

User = get_user_model()


@api_view(['GET'])
def get_user_groups(request):
    groups = request.user.groups.all().order_by("-created_at")
    return Response({"groups": GroupSerializer(groups, many=True, context={'user': request.user}).data},
                    status=status.HTTP_200_OK)

class CreateGroupView(CreateModelMixin, GenericAPIView):
    serializer_class = GroupCreateSerializer
    queryset = GroupModel.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        group = serializer.save(admin=self.request.user)
        group.users.add(self.request.user)
        users = self.request.data.get("users", [])
        for userId in users:
            user = User.objects.get(id=userId)
            group.users.add(user)
        return group

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group = self.perform_create(serializer)
        return group

    def post(self, request, *args, **kwargs):
        group = self.create(request, *args, **kwargs)
        if(group):
            layer = get_channel_layer()
            for user in group.users.all().exclude(id=group.admin.id):
                async_to_sync(layer.group_send)(f'groups_{user.id}', {
                    'type': 'new_group',
                    'data': GroupSerializer(group, many=False, context={'user': user}).data
                })

        return Response({"group_data": GroupSerializer(group, many=False, context={'user': request.user}).data},
                        status=status.HTTP_201_CREATED)


