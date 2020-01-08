from rest_framework import serializers

from .models import *


class UserList(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name','last_name', 'username', 'birthday', 'email', 'active', 'eventplanner', 'invited',
                  'responsible', 'supporters']

        def get_user_username(self, obj):
            return obj.user.username if obj.user else ''


class UserForm (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

        def get_user_username(self, obj):
            return obj.user.username if obj.user else ''


class TaskListSerializer(serializers.ModelSerializer):
    event_name = serializers.SerializerMethodField()
    responsible = serializers.SerializerMethodField()
    supporters = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'verified_by_planner', 'verified_by_participant',
                  'status', 'deadline', 'responsible', 'supporters', 'event_name']

    def get_event_name(self, obj):
        return obj.event.name if obj.event else ''

    def get_responsible(self, obj):
        return obj.responsible.username if obj.responsible else ''

    def get_supporters(self, obj):
        if obj:
            return {' ' + x.username for x in obj.supporters.all()}


class TaskFormSerializer(serializers.ModelSerializer):
    event_name = serializers.SerializerMethodField()
    responsible = serializers.SerializerMethodField()
    supporters = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = '__all__'

    def get_event_name(self, obj):
        return obj.event.name if obj.event else ''

    def get_responsible(self, obj):
        return obj.responsible.username if obj.responsible else ''

    def get_supporters(self, obj):
        if obj:
            return {' ' + x.username for x in obj.supporters.all()}

class TagFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class EventListSerializer(serializers.ModelSerializer):
    eventplanner = serializers.SerializerMethodField()
    invited = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ['id', 'name', 'date','time', 'description', 'location', 'public', 'eventplanner', 'invited', 'tasks', 'message']

    def get_eventplanner(self, obj):
        return obj.eventplanner.username if obj.eventplanner else ''

    def get_invited(self, obj):
        if obj:
            return {' ' + x.username for x in obj.invited.all()}


class EventFormSerializer(serializers.ModelSerializer):
    tasks = TaskFormSerializer(read_only=True, many=True)

    class Meta:
        model = Event
        fields = [field.name for field in model._meta.fields]
        fields.append('invited')
        fields.append('tasks')
        #fields = ['__all__', 'tasks']
        #fields = ['tasks',]


class ForumentryListSerializer(serializers.ModelSerializer):
    event = serializers.SerializerMethodField()

    class Meta:
        model = Forumentry
        fields = ['id', 'content', 'datetime', 'user', 'event']

    def get_event(self, obj):
        return obj.event.name if obj.event else ''


class ForumentryFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Forumentry
        fields = '__all__'
