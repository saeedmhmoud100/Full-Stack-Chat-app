# Generated by Django 5.0.7 on 2024-08-05 13:57

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("public_chat", "0010_rename_publicchatroom_publicchatmodel"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name="PublicChatRoomMessage",
            new_name="PublicChatMessageModel",
        ),
    ]