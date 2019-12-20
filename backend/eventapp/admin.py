from django.contrib import admin

# Register your models here.
from eventapp.models import User, Forumentry, Event, Tag, Task


class UserAdmin(admin.ModelAdmin):
    list_display = ['username','email','active']
    pass
admin.site.register(User,UserAdmin)

class ForumentryAdmin(admin.ModelAdmin):
    list_display = ['title','content','datetime']
    pass
admin.site.register(Forumentry,ForumentryAdmin)

class EventAdmin(admin.ModelAdmin):
    list_display = ['name','datetime','description','location','public']
    pass
admin.site.register(Event,EventAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ['name']
    pass
admin.site.register(Tag,TagAdmin)

class TaskAdmin(admin.ModelAdmin):
    list_display = ['title','description','verified_by_planner','verified_by_participant','status','deadline']
    pass
admin.site.register(Task,TaskAdmin)