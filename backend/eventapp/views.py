from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, views
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from .models import Task, Event, Forumentry, Tag, Profile, Media, FriendshipRequest
from .serializers import TaskListSerializer, TaskFormSerializer, UserList, UserForm, TagFormSerializer, \
    EventListSerializer, EventFormSerializer, ForumentryFormSerializer, ForumentryListSerializer, AbstractUserForm, \
    MediaSerializer,UserCreateForm, AbstractUserCreateForm, FriendshipRequestList, FriendshipRequestForm, UserFormUpdate, UserEventTaskSerializers


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
@authentication_classes([])
@permission_classes([])
def user_form_adapted_create(request):
    serializer = AbstractUserCreateForm(data=request.data)
    if serializer.is_valid():
        User.objects.create_user(serializer.validated_data['username'], password=serializer.validated_data['password'])
        return Response(serializer.data, status=201)
    return Response(serializer.data, status=400)


'''
@api_view(['POST'])
def user_form_create(request):
    serializer = UserForm(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
'''

@api_view(['PUT'])
def user_form_update(request, pk):
    try:
        user = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = UserFormUpdate(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


''' FRIENDSHIP REQUEST VIEWS '''

@api_view(['GET'])
def friendship_request_list(request):
    requests = FriendshipRequest.objects.all()
    serializers = FriendshipRequestList(requests, many=True)
    return Response(serializers.data)

@api_view(['POST'])
def friendship_request_form_create(request):
    serializer = FriendshipRequestForm(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def friendship_request_form_update(request, pk):
    try:
        friendRequest = FriendshipRequest.objects.get(pk=pk)
    except FriendshipRequest.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = FriendshipRequestForm(friendRequest, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


''' TAG VIEWS '''

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


@api_view(['GET'])
def task_form_get_userId(request, pk):
    try:
        task = Task.objects.filter(responsible=pk)
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
def event_listId(request):
    events = Event.objects.all()
    serializers = EventFormSerializer(events, many=True)
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


@api_view(['GET'])
def event_form_get_userId(request, pk):
    try:
        event = Event.objects.filter(participants=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Event does not exist'}, status=404)
    serializer = EventFormSerializer(event, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
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
def tasks_list_options(request, pk):
    tasks = Task.objects.get(pk=pk)
    serializer = TaskFormSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def event_option_list(request):
    event = Event.objects.all()
    serializer = EventListSerializer(event, many=True)
    return Response(serializer.data)



'''Fileupload'''


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        file = request.FILES['file']
        file_input = {
            'original_file_name': file.name,
            'content_type': file.content_type,
            'size': file.size,
        }
        serializer = MediaSerializer(data=file_input)
        if serializer.is_valid():
            serializer.save()
            default_storage.save('media/' + str(serializer.data['id']), ContentFile(file.read()))
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


def media_download(request, pk):
    media = Media.objects.get(pk=pk)
    data = default_storage.open('media/' + str(pk)).read()
    content_type = media.content_type
    response = HttpResponse(data, content_type=content_type)
    original_file_name = media.original_file_name
    response['Content-Disposition'] = 'inline; filename=' + original_file_name
    return response


@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
def media_get(request, pk):
    try:
        media = Media.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Media does not exist.'}, status=404)

    serializer = MediaSerializer(media)
    return Response(serializer.data)

@api_view(['GET'])
def user_form(request, pk):
    try:
        user = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = UserForm(user)
    return Response(serializer.data)

@api_view(['GET'])
def user_task_event(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = UserEventTaskSerializers(user)
    return Response(serializer.data)
