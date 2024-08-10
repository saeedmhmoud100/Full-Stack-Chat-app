# Generated by Django 5.0.7 on 2024-08-06 23:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("private_chat", "0003_rename_active_privatechatmodel_is_active"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="privatechatmessagemodel",
            name="chat",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="messages",
                to="private_chat.privatechatmodel",
            ),
        ),
        migrations.AlterField(
            model_name="privatechatmodel",
            name="user1",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="private_chats1",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="privatechatmodel",
            name="user2",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="private_chats2",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]