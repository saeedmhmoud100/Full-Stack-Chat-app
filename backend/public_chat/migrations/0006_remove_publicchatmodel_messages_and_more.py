# Generated by Django 5.0.7 on 2024-07-12 12:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("public_chat", "0005_alter_publicchatmodel_messages"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="publicchatmodel",
            name="messages",
        ),
        migrations.AddField(
            model_name="publicchatmessagesmodel",
            name="messages",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="public_chat.publicchatmodel",
            ),
        ),
    ]
