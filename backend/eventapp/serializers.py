from rest_framework import serializers

from eventapp.models import User


class UserList(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name','last_name','username','birthday','email','active','planner','invited','responsible','supporters']


class UserForm (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
