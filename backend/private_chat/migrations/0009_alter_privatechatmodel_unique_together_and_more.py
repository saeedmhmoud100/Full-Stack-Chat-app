# Generated by Django 5.0.7 on 2024-08-10 16:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("private_chat", "0008_alter_privatechatmodel_options"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="privatechatmodel",
            unique_together=set(),
        ),
        migrations.CreateModel(
            name="ChatParticipant",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("joined_at", models.DateTimeField(auto_now_add=True)),
                (
                    "chat",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="participants",
                        to="private_chat.privatechatmodel",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="chat_participants",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "unique_together": {("chat", "user")},
            },
        ),
        migrations.AddField(
            model_name="privatechatmodel",
            name="users",
            field=models.ManyToManyField(
                related_name="private_chats",
                through="private_chat.ChatParticipant",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.RemoveField(
            model_name="privatechatmodel",
            name="user1",
        ),
        migrations.RemoveField(
            model_name="privatechatmodel",
            name="user2",
        ),
    ]
