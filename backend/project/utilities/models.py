from django.db import models



class BaseModelQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_active=True)


class BaseModelManager(models.Manager):
    def get_queryset(self):
        return BaseModelQuerySet(self.model, using=self._db)

    def active(self):
        return self.get_queryset().active()


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    objects = BaseModelManager()


    class Meta:
        abstract = True