from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import Task, Event, Forumentry, Tag, User
from .serializers import TaskListSerializer, TaskFormSerializer


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


@api_view(['DELETE'])
def task_delete(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Task does not exist.'}, status=404)
    task.delete()
    return Response(status=204)
