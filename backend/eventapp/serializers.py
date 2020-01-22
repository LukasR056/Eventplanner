from rest_framework import serializers

from .models import *

class FriendshipRequestList(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = '__all__'

class FriendshipRequestForm(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = '__all__'


class AbstractUserForm(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
        # fields = ['username']


class UserList(serializers.ModelSerializer):
    user = AbstractUserForm(read_only=True)
    friend_requests = FriendshipRequestList(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = '__all__'


class UserForm (serializers.ModelSerializer):
    user = AbstractUserForm(read_only=True)
    friend_requests = FriendshipRequestList(many=True)
    #friends = UserList(many=True)

    class Meta:
        model = Profile
        fields = '__all__'

class UserFormUpdate (serializers.ModelSerializer):
    user = AbstractUserForm(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'


class AbstractUserCreateForm (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

class UserCreateForm (serializers.ModelSerializer):
    user = AbstractUserCreateForm()
    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'birthday']



class TaskListSerializer(serializers.ModelSerializer):
    event = serializers.SerializerMethodField()
    responsible = serializers.SerializerMethodField()
    supporters = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'verified_by_planner', 'verified_by_participant',
                  'status', 'deadline', 'responsible', 'supporters', 'event']

    def get_event(self, obj):
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
        fields = ['id', 'name', 'date','time', 'description', 'location', 'public', 'eventplanner', 'invited', 'tasks', 'message','tags','participants', 'pictures']

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
        fields.append('tags')
        fields.append('eventplanner')
        fields.append('participants')
        fields.append('pictures')
        #fields = ['__all__', 'tasks']
        #fields = ['tasks',]


class ForumentryListSerializer(serializers.ModelSerializer):
    event = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    userid = serializers.SerializerMethodField()

    class Meta:
        model = Forumentry
        fields = ['id', 'content', 'datetime', 'user', 'event', 'userid']

    def get_event(self, obj):
        return obj.event.name if obj.event else ''

    def get_user(self, obj):
        return obj.user.username if obj.user else ''

    def get_userid(self, obj):
        return obj.user.id if obj.user else ''


class ForumentryFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Forumentry
        fields = '__all__'



class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

class UserEventTaskSerializers(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username','invited','participants','responsible','supporters']
