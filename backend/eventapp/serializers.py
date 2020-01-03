from rest_framework import serializers
from .models import *


class ForumentryListSerializer(serializers.ModelSerializer):
    forumentry_title = serializers.SerializerMethodField()

    class Meta:
        model = Forumentry
        fields = ['id', 'title', 'content', 'datetime', 'user', 'event']

    def get_forumentry_title(self, obj):
        return obj.forumentry.title if obj.forumentry else ''


class TaskListSerializer(serializers.ModelSerializer):
    """event_name = serializers.SerializerMethodField()"""

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'verified_by_planner', 'verified_by_participant',
                  'status', 'deadline', 'responsible', 'supporters', 'event']

    def get_event_name(self, obj):
        return obj.event.name if obj.event else ''


class TaskFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
