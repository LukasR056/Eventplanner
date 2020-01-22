import datetime

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now


# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birthday = models.DateField(default=datetime.date.today)
    active = models.BooleanField(default=True)
    friends = models.ManyToManyField('self', blank=True)
    # friend_requests = models.ManyToManyField('FriendshipRequest', related_name='user', blank=True)


    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()



class FriendshipRequest(models.Model):
    user = models.ForeignKey(Profile, related_name='friend_requests', on_delete=models.CASCADE)
    potential_friends = models.ManyToManyField(Profile, blank=True)
    request_sent = models.BooleanField()

    def __str__(self):
        return str(self.user)

class Event(models.Model):
    name = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    location = models.TextField()
    public = models.BooleanField()
    eventplanner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='eventplanner')
    invited = models.ManyToManyField(User, related_name='invited', blank=True)
    participants = models.ManyToManyField(User, related_name='participants', blank=True)
    pictures = models.ManyToManyField('Media', blank=True)

    # https://stackoverflow.com/questions/13918968/multiple-many-to-many-relations-to-the-same-model-in-django

    def __str__(self):
        return self.name


class Forumentry(models.Model):
    content = models.TextField()
    datetime = models.DateTimeField(default=now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='message', on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Task(models.Model):
    STATUS = (
        ('o', 'Open'),
        ('p', 'In Progress'),
        ('d', 'Done')
    )
    title = models.TextField()
    description = models.TextField()
    verified_by_planner = models.BooleanField()
    verified_by_participant = models.BooleanField()
    status = models.CharField(max_length=1, choices=STATUS)
    deadline = models.DateTimeField()
    responsible = models.ForeignKey(User, on_delete=models.CASCADE, related_name='responsible')
    supporters = models.ManyToManyField(User, related_name='supporters', blank=True)
    event = models.ForeignKey(Event, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.TextField(unique=True)
    events = models.ManyToManyField(Event, related_name='tags', blank=True)

    def __str__(self):
        return self.name


# test

class Media(models.Model):
    original_file_name = models.TextField()
    content_type = models.TextField()
    size = models.PositiveIntegerField()
