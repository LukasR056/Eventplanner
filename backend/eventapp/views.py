from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from eventapp.models import User
from eventapp.serializers import UserList, UserForm


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
