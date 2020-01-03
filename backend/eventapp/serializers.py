from rest_framework import serializers

from .models import *


class UserList(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name','last_name','username','birthday','email','active','planner','invited','responsible','supporters']


class UserForm (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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
    class Meta:
        model = Event
        fields = ['name', 'datetime', 'description', 'location']

class EventFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

