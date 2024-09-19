"""
ASGI config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import path, re_path

from accounts.consumers import AccountConsumer
from friends.consumers import FriendConsumer
from groups.consumers import GroupsConsumer
from notifications.consumers import NotificationConsumer
from private_chat.consumers import PrivateChatConsumer, AllPrivateChatsConsumer
from project.middleware import JWTAuthMiddleware
from public_chat.consumers import PublicChatConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        JWTAuthMiddleware(
            AuthMiddlewareStack(
                URLRouter([
                    path("ws/account", AccountConsumer.as_asgi()),
                    path("ws/friend", FriendConsumer.as_asgi()),
                    path("ws/public_chat", PublicChatConsumer.as_asgi()),
                    path('ws/private_chats', AllPrivateChatsConsumer.as_asgi()),
                    re_path(r'^ws/private_chat/(?P<room_id>\w+)$', PrivateChatConsumer.as_asgi()),
                    path('ws/groups', GroupsConsumer.as_asgi()),
                    path('ws/notifications', NotificationConsumer.as_asgi()),
                ])
            )
        )
    ),
})