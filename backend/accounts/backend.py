from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()


class CustomAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)
        try:
            user = User.objects.get(Q(email__exact=username) | Q(username__exact=username))
            # case_insensitive_username_field = f'{User.USERNAME_FIELD}__iexact'
            # user = User.objects.get(**{case_insensitive_username_field: username})
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        except Exception as e:
            return None
        return None