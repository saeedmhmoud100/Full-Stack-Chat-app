# Generated by Django 5.0.7 on 2024-07-12 11:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("public_chat", "0003_publicchatmodel_user_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="PublicChatMessagesModel",
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
                ("message", models.TextField(max_length=100)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("active", models.BooleanField(default=True)),
                ("user_id", models.CharField(default="anonymous", max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name="publicchatmodel",
            name="active",
        ),
        migrations.RemoveField(
            model_name="publicchatmodel",
            name="created_at",
        ),
        migrations.RemoveField(
            model_name="publicchatmodel",
            name="message",
        ),
        migrations.RemoveField(
            model_name="publicchatmodel",
            name="user_id",
        ),
        migrations.AddField(
            model_name="publicchatmodel",
            name="users_online_count",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="publicchatmodel",
            name="messages",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="public_chat.publicchatmessagesmodel",
            ),
            preserve_default=False,
        ),
    ]
