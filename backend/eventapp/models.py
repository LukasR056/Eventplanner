import datetime

from django.db import models


# Create your models here.
class User(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    username = models.TextField(unique=True, null=False)
    birthday = models.DateField(default=datetime.date.today)
    email = models.TextField()
    active = models.BooleanField()

    def __str__(self): return self.username


class Event(models.Model):
    name = models.TextField()
    datetime = models.DateTimeField()
    description = models.TextField()
    location = models.TextField()
    public = models.BooleanField()
    eventplanner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='planner')
    invited = models.ManyToManyField(User, related_name='invited')

    # https://stackoverflow.com/questions/13918968/multiple-many-to-many-relations-to-the-same-model-in-django

    def __str__(self): return self.name


class Forumentry(models.Model):
    title = models.TextField()
    content = models.TextField()
    datetime = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self): return self.title


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
    supporters = models.ManyToManyField(User, related_name='supporters', null=True, blank=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self): return self.title


class Tag(models.Model):
    name = models.TextField()
    events = models.ManyToManyField(Event)


    def __str__(self): return self.name


'''test'''
