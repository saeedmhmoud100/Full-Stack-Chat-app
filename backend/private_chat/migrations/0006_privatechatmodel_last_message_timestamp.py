# Generated by Django 5.0.7 on 2024-08-08 21:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("private_chat", "0005_rename_content_privatechatmessagemodel_message"),
    ]

    operations = [
        migrations.AddField(
            model_name="privatechatmodel",
            name="last_message_timestamp",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
