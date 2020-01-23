from django.contrib import admin

# Register your models here.
from eventapp.models import Profile, Forumentry, Event, Tag, Task, FriendshipRequest


class UserAdmin(admin.ModelAdmin):
    list_display = ['user','active','first_name','last_name','birthday']
    pass
admin.site.register(Profile,UserAdmin)

class FriendshipRequestAdmin(admin.ModelAdmin):
    list_display = ['user', 'request_sent']
    pass
admin.site.register(FriendshipRequest,FriendshipRequestAdmin)

class ForumentryAdmin(admin.ModelAdmin):
    list_display = ['content','datetime']
    pass
admin.site.register(Forumentry,ForumentryAdmin)

class EventAdmin(admin.ModelAdmin):
    list_display = ['name','date','time','description','location','public']
    pass
admin.site.register(Event,EventAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ['name']
    pass
admin.site.register(Tag,TagAdmin)

class TaskAdmin(admin.ModelAdmin):
    list_display = ['id','title','description','verified_by_planner','verified_by_participant','status','deadline_date','deadline_time']
    pass
admin.site.register(Task,TaskAdmin)
