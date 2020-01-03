from django.conf.urls import url
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin


from eventapp import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('task/list', views.tasks_list),
    path('task/create', views.task_form_create),
    path('task/<int:pk>/get', views.task_form_get),
    path('task/<int:pk>/update', views.task_form_update),
    path('task/<int:pk>/delete', views.task_delete),


    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api-token-auth/', obtain_jwt_token)
]
