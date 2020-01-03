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
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin


from eventapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', views.user_list),
    path('user/<int:pk>/get', views.user_form),
    path('user/create', views.user_form_create),
    path('user/<int:pk>/update', views.user_form_update),
    path('user/<int:pk>/delete', views.user_delete),

    path('task/list', views.tasks_list),
    path('task/create', views.task_form_create),
    path('task/<int:pk>/get', views.task_form_get),
    path('task/<int:pk>/update', views.task_form_update),
    path('task/<int:pk>/delete', views.task_delete),

    path('tag/list', views.tag_form_list),
    path('tag/create', views.tag_form_create),
    path('tag/<int:pk>/get', views.tag_form_get),
    path('tag/<int:pk>/update', views.tag_form_update),
    path('tag/<int:pk>/delete', views.tag_delete),

    path('event/list', views.event_list),
    path('event/create', views.event_form_create),
    path('event/<int:pk>/get', views.event_form_get),
    path('event/<int:pk>/update', views.event_form_update),
    path('event/<int:pk>/delete', views.event_delete),
]

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

