# Generated by Django 5.0.7 on 2024-08-06 12:19

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("private_chat", "0002_privatechatmessagemodel"),
    ]

    operations = [
        migrations.RenameField(
            model_name="privatechatmodel",
            old_name="active",
            new_name="is_active",
        ),
    ]
