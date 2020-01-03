from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import Tag, Event
from .serializers import TagFormSerializer, EventListSerializer, EventFormSerializer

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

@api_view(['POST'])
def event_form_create(request):
    serializer = EventFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response (serializer.errors, status=400)

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
def event_delete(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Event does not exist'}, status=404)
    event.delete()
    return Response(status=204)

