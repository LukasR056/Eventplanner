from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task, Event, Forumentry, Tag, Profile
from .serializers import TaskListSerializer, TaskFormSerializer, UserList, UserForm, TagFormSerializer, \
    EventListSerializer, EventFormSerializer, ForumentryFormSerializer, ForumentryListSerializer, AbstractUserForm


@api_view(['GET'])
def abstract_user_form(request, username):
    try:
        abstract_user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'}, status=404)
    serializer = AbstractUserForm(abstract_user)
    return Response(serializer.data)

@api_view(['GET'])
def user_list(request):
    users = Profile.objects.all()
    serializers = UserList(users, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def user_form(request, pk):
    try:
        user = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = UserForm(user)
    return Response(serializer.data)


@api_view(['POST'])
def user_form_create(request):
    serializer = UserForm(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


''' TAG SERIALIZERS '''


@api_view(['GET'])
def tag_form_list(request):
    tags = Tag.objects.all()
    serializer = TagFormSerializer(tags, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def tag_form_create(request):
    serializer = TagFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def tasks_list(request):
    tasks = Task.objects.all()
    serializer = TaskListSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def task_form_get(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task does not exist.'}, status=404)

    serializer = TaskFormSerializer(task)
    return Response(serializer.data)


@api_view(['POST'])
def task_form_create(request):
    serializer = TaskFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
def user_form_update(request, pk):
    try:
        user = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = UserForm(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT'])
def task_form_update(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task does not exist.'}, status=404)
    serializer = TaskFormSerializer(task, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT'])
def task_form_update_status(request, pk, status):
    try:
        task = Task.objects.get(pk=pk)
        task.status = status
        task.save()
    except Task.DoesNotExist:
        return Response({'error': 'Task does not exist.'}, status=404)
    return Response(status=200)


@api_view(['GET'])
def tag_form_get(request, pk):
    try:
        tag = Tag.objects.get(pk=pk)
    except Tag.DoesNotExist:
        return Response({'error': 'Tag does not exist'}, status=404)

    serializer = TagFormSerializer(tag)
    return Response(serializer.data)


@api_view(['PUT'])
def tag_form_update(request, pk):
    try:
        tag = Tag.objects.get(pk=pk)
    except Tag.DoesNotExist:
        return Response({'error': 'Tag does not exist'}, status=404)
    serializer = TagFormSerializer(tag, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def tag_delete(request, pk):
    try:
        tag = Tag.objects.get(pk=pk)
    except Tag.DoesNotExist:
        return Response({'error': 'Tag does not exist'}, status=404)
    tag.delete()
    return Response(status=204)


''' EVENT SERIALIZERS '''


@api_view(['GET'])
def event_list(request):
    events = Event.objects.all()
    serializers = EventListSerializer(events, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def event_list_firstrow(request):
    events = Event.objects.order_by('date').all()[:4]
    serializers = EventListSerializer(events, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def event_form_create(request):
    serializer = EventFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def event_form_get(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Event does not exist'}, status=404)
    serializer = EventFormSerializer(event)
    return Response(serializer.data)


@api_view(['POST'])
def event_form_update(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error', 'Event does not exist'}, status=404)
    serializer = EventFormSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def user_delete(request, pk):
    try:
        user = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)

    if request.method == 'GET':
        serializer = UserForm(user)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
def task_delete(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Task does not exist.'}, status=404)
    task.delete()
    return Response(status=204)


@api_view(['DELETE'])
def event_delete(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Event does not exist'}, status=404)
    event.delete()
    return Response(status=204)


'''@swagger_auto_schema(method='GET', responses={200: ForumentryListSerializer(many=True)})'''


@api_view(['GET'])
def forumentry_list(request):
    forumentries = Forumentry.objects.all()
    serializer = ForumentryListSerializer(forumentries, many=True)
    return Response(serializer.data)


'''@swagger_auto_schema(method='GET', responses={200: ForumentryFormSerializer()})'''


@api_view(['GET'])
def forumentry_list_event(request, event):
    forumentrieswithevent = Forumentry.objects.filter(event=event)
    serializer = ForumentryListSerializer(forumentrieswithevent, many=True)
    return Response(serializer.data)


def forumentry_form_get(request, pk):
    try:
        forumentry = Forumentry.objects.get(pk=pk)
    except Forumentry.DoesNotExist:
        return Response({'error': 'Forumentry does not exist.'}, status=404)

    serializer = ForumentryFormSerializer(forumentry)
    return Response(serializer.data)


@api_view(['POST'])
def forumentry_form_create(request):
    """data = JSONParser().parse(request)"""
    serializer = ForumentryFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
def forumentry_form_update(request, pk):
    try:
        forumentry = Forumentry.objects.get(pk=pk)
    except Forumentry.DoesNotExist:
        return Response({'error': 'Forum entry does not exist.'}, status=404)

    """data = JSONParser().parse(request)"""
    serializer = ForumentryFormSerializer(forumentry, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def forumentry_delete(request, pk):
    try:
        forumentry = Forumentry.objects.get(pk=pk)
    except Forumentry.DoesNotExist:
        return Response({'error': 'Forum entry does not exist.'}, status=404)
    forumentry.delete()
    return Response(status=204)


@api_view(['GET'])
def tasks_list_options(request,pk):
    tasks = Task.objects.get(pk=pk)
    serializer = TaskFormSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def event_option_list(request):
    event = Event.objects.all()
    serializer = EventListSerializer(event, many=True)
    return Response(serializer.data)
