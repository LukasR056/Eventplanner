from rest_framework import serializers
from .models import *


class ForumentryListSerializer(serializers.ModelSerializer):
    forumentry_title = serializers.SerializerMethodField()

    class Meta:
        model = Forumentry
        fields = ['id', 'title', 'content', 'datetime', 'user', 'event']

    def get_forumentry_title(self, obj):
        return obj.forumentry.title if obj.forumentry else ''

