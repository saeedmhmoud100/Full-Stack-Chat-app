from django.db import models


# Create your models here.




class PublicChatModel(models.Model):
    users_online_count = models.IntegerField(default=0)



    def decrease_users_count(self):
        self.users_online_count -= 1
        self.save()
        return self.users_online_count

    def increase_users_count(self):
        self.users_online_count += 1
        self.save()
        return self.users_online_count

class PublicChatMessagesModel(models.Model):
    group = models.ForeignKey(PublicChatModel ,on_delete=models.CASCADE,null=True,blank=True,related_name='messages')
    message = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    user_id = models.CharField(max_length=100, default="anonymous")

    def __str__(self):
        return self.message
