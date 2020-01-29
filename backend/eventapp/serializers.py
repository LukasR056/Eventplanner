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

class UserListName(serializers.ModelSerializer):
    user = AbstractUserForm(read_only=True)
    class Meta:
        model = Profile
        fields = ['user']


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
        fields = ['user', 'first_name', 'last_name', 'birthday', 'pictures']



class TaskEventplannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'eventplanner', 'name']

class TaskResponsibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class TaskListSerializer(serializers.ModelSerializer):
    event = TaskEventplannerSerializer()
    responsible = TaskResponsibleSerializer()

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'verified_by_planner', 'verified_by_participant',
                  'status', 'deadline_date', 'deadline_time', 'responsible', 'event']


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
    participants = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'name', 'date','time', 'description', 'location', 'public', 'eventplanner', 'invited', 'tasks', 'message','tags','participants', 'pictures']

    def get_eventplanner(self, obj):
        return obj.eventplanner.username if obj.eventplanner else ''

    def get_invited(self, obj):
        if obj:
            return {' ' + x.username for x in obj.invited.all()}

    def get_participants(self, obj):
        if obj:
            return {' ' + x.username for x in obj.participants.all()}


class EventFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = [field.name for field in model._meta.fields]
        fields.append('invited')
        fields.append('tasks')
        fields.append('tags')
        fields.append('eventplanner')
        fields.append('participants')
        fields.append('pictures')


class EventCheckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ['id','eventplanner']




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
        fields = ['id','username','invited','participants','responsible']
