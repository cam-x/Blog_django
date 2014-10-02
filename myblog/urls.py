from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns(
    '',
    url(r'^$', views.blog_index, name="index"),
    url(r'^(?P<category>\w+)$', views.blog_index, name="index_category"),
    url(r'^(?P<category>\w+)/(?P<slug>[\w-]+)$', views.blog_detail, name="article_detail"),
)
