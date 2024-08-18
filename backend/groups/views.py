from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from groups.models import GroupModel
from groups.serializers import GroupSerializer

# Create your views here.

User = get_user_model()

@api_view(['POST'])
def create_group(request):
    data = request.data
    group = GroupModel.objects.create(
        name=data["name"],
        description=data["description"],
        admin=request.user
    )
    group.add_user(request.user)

    users = data.get("users", [])
    for userId in users:
        user = User.objects.get(id=userId)
        group.add_user(user)

    return Response({"group_data": GroupSerializer(group,many=False).data},status=status.HTTP_201_CREATED)
