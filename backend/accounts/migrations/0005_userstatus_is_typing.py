# Generated by Django 5.0.7 on 2024-08-13 10:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0004_userstatus_content_type_userstatus_object_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="userstatus",
            name="is_typing",
            field=models.BooleanField(default=False),
        ),
    ]
