import datetime

from django.db import models
from django.utils.timezone import now


# Create your models here.
class User(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    username = models.TextField(unique=True, null=False)
    birthday = models.DateField(default=datetime.date.today)
    email = models.TextField()
    active = models.BooleanField()

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
    content = models.TextField()
    datetime = models.DateTimeField(default=now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='message', on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Task(models.Model):
    STATUS = (
        ('o', 'Open'),
        ('i', 'In Progress'),
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
    name = models.TextField()
    events = models.ManyToManyField(Event, blank=True)

    # wird beidseitig benötigt und muss noch gelöst werden

    def __str__(self):
        return self.name
# test
