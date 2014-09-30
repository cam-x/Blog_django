from django.contrib import admin
from . import models
from django_markdown.admin import MarkdownModelAdmin


class ArticleAdmin(MarkdownModelAdmin):
    list_display = ("title", "category", "article_id","created")

admin.site.register(models.Article, ArticleAdmin)
