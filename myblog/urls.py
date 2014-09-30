from django.conf.urls import patterns, url
from . import views

urlpatterns = patterns(
    '',
    url(r'^$', views.blog_index, name="index"),
    url(r'^(?P<category>\w+)$', views.blog_index, name="index_category"),
    url(r'^(?P<category>\w+)/(?P<pk>\d+)$', views.BlogDetail.as_view(), name="article_detail"),
)
