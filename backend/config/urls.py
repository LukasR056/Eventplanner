"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token


from eventapp import views
from eventapp.views import FileUploadView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/list/', views.user_list),
    path('user/list/name', views.user_list_name),
    path('user/options', views.user_list),
    path('user/<int:pk>/get', views.user_form),
    path('user/<int:pk>/gettaskevent', views.user_task_event),
    # path('user/create', views.user_form_create), EIGENTLICH NICHT MEHR BENÖTIGT
    path('user/create', views.user_form_adapted_create),
    path('user/<int:pk>/update', views.user_form_update),
    path('user/<int:pk>/delete', views.user_delete),

    path('friendship-request/list', views.friendship_request_list),
    path('friendship-request/create', views.friendship_request_form_create),
    path('friendship-request/<int:pk>/update', views.friendship_request_form_update),

    path('task/list', views.tasks_list),
    path('task/create', views.task_form_create),
    path('task/<int:pk>/get', views.task_form_get),
    path('task/<int:pk>/update', views.task_form_update),
    path('task/<int:pk>/delete', views.task_delete),
    path('task/<int:pk>/update/status/<str:status>', views.task_form_update_status),
    path('task/user/<int:pk>/get', views.task_form_get_userId),
    # path('task/<int:pk>/details', views.tasks_list_options),

    path('tag/list', views.tag_form_list),
    path('tag/create', views.tag_form_create),
    path('tag/<int:pk>/get', views.tag_form_get),
    path('tag/<int:pk>/update', views.tag_form_update),
    path('tag/<int:pk>/delete', views.tag_delete),

    path('forumentry/list', views.forumentry_list),
    path('forumentry/list/event/<int:event>', views.forumentry_list_event),
    path('forumentry/list/event/<int:event>/get', views.forumentry_list_event),
    path('forumentry/create', views.forumentry_form_create),
    path('forumentry/<int:pk>/get', views.forumentry_form_get),
    path('forumentry/<int:pk>/update', views.forumentry_form_update),
    path('forumentry/<int:pk>/delete', views.forumentry_delete),

    path('event/list', views.event_list),
    path('event/listId', views.event_listId),
    path('event/list/firstrow', views.event_list_firstrow),
    path('event/options', views.event_list),
    path('event/create', views.event_form_create),
    path('event/<int:pk>/get', views.event_form_get),
    path('event/<int:pk>/<int:pk2>/get', views.event_form_update_check_eventplanner),
    path('event/<int:pk>/update', views.event_form_update),
    path('event/<int:pk>/delete', views.event_delete),
    path('event/user/<int:pk>/get', views.event_form_get_userId),

    url(r'^media$', FileUploadView.as_view()),
    path('media/<int:pk>', views.media_download),
    path('media/<int:pk>/get', views.media_get),
    path('media/<int:pk>/delete', views.media_delete),




    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),

]

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

