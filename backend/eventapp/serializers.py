from rest_framework import serializers

from .models import *


class UserList(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name','last_name','username','birthday','email','active','eventplanner','invited','responsible','supporters','friends']

        def get_user_username(self, obj):
            return obj.user.username if obj.user else ''


class UserForm (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

        def get_user_username(self, obj):
            return obj.user.username if obj.user else ''



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

class TagFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class EventListSerializer(serializers.ModelSerializer):
    eventplanner = serializers.SerializerMethodField()
    invited = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['id', 'name', 'date','time', 'description', 'location', 'public', 'eventplanner','invited','tasks']

    def get_eventplanner(self, obj):
        return obj.eventplanner.username if obj.eventplanner else ''

    def get_invited(self, obj):
        if obj:
            return {' ' + x.username for x in obj.invited.all()}

class EventFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class ForumentryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Forumentry
        fields = ['id', 'title', 'content', 'datetime', 'user', 'event']

    @staticmethod
    def get_event_name(obj):
        return obj.event.name if obj.event else ''


class ForumentryFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Forumentry
        fields = '__all__'
