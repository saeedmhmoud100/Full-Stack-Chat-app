from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from private_chat.serializers import PrivateChatSerializer


# Create your views here.


@api_view(['GET'])
def get_all_private_chats(request):
    user = request.user
    private_chats = user.private_chats.all().order_by('-last_message_timestamp')
    serializer = PrivateChatSerializer(private_chats, many=True, context={'request': request}).data
    return Response(data={'data':serializer},status=200)
