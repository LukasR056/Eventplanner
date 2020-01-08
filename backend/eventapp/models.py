import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models



# Create your models here.
class User(AbstractUser):
    first_name = models.TextField()
    last_name = models.TextField()
    birthday = models.DateField(default=datetime.date.today)
    active = models.BooleanField(default=True)
    friends = models.ManyToManyField('self',blank=True)

    def __str__(self):
        return self.username


class Event(models.Model):
    name = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    location = models.TextField()
    public = models.BooleanField()
    eventplanner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='eventplanner')
    invited = models.ManyToManyField(User, related_name='invited', blank=True)

    # https://stackoverflow.com/questions/13918968/multiple-many-to-many-relations-to-the-same-model-in-django

    def __str__(self):
        return self.name


class Forumentry(models.Model):
    title = models.TextField()
    content = models.TextField()
    datetime = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Task(models.Model):
    STATUS = (
        ('o', 'Open'),
        ('p', 'Process'),
        ('d', 'Done')
    )
    title = models.TextField()
    description = models.TextField()
    verified_by_planner = models.BooleanField()
    verified_by_participant = models.BooleanField()
    status = models.CharField(max_length=1, choices=STATUS)
    deadline = models.DateTimeField()
    responsible = models.ForeignKey(User, on_delete=models.CASCADE,related_name='responsible')
    supporters = models.ManyToManyField(User, related_name='supporters', blank=True)
    event = models.ForeignKey(Event, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.TextField()
    events = models.ManyToManyField(Event, blank=True)
    # wird beidseitig benötigt und muss noch gelöst werden

    def __str__(self):
        return self.name
