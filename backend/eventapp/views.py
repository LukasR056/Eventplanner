from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task, Event, Forumentry, Tag, User
from .serializers import TaskListSerializer, TaskFormSerializer, UserList, UserForm

@api_view(['GET'])
def user_list(request):
    users = User.objects.all()
    serializers = UserList(users,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def user_form(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = UserForm(user)
    return Response (serializer.data)

@api_view(['POST'])
def user_form_create(request):
    serializer = UserForm(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



@swagger_auto_schema(method='GET', responses={200: TaskListSerializer(many=True)})
@api_view(['GET'])
def tasks_list(request):
    events = Task.objects.all()
    serializer = TaskListSerializer(events, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: TaskFormSerializer()})
@api_view(['GET'])
def task_form_get(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response({'error': 'Task does not exist.'}, status=404)

    serializer = TaskFormSerializer(task)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=TaskFormSerializer, responses={200: TaskFormSerializer()})
@api_view(['POST'])
def task_form_create(request):
    serializer = TaskFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def user_form_update(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist.'}, status=404)
    serializer = UserForm(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=TaskFormSerializer, responses={200: TaskFormSerializer()})
@api_view(['PUT'])
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

@api_view(['GET','DELETE'])
def user_delete(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
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
