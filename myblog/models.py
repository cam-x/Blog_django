from django.db import models

class ArticleQuerySet(models.QuerySet):
    def published(self):
        return self.filter(publish=True)


class Article(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    """
    CATEGORY = (
        ('xss', 'Cross Site Scripting'),
        ('pentest', 'Penetration Test'),
    )
    category = models.CharField(max_length=200,
                                choices=CATEGORY,
                                default='xss')
    """
    category = models.CharField(max_length=200, default='xss')
    abstract = models.CharField(max_length=200, default='nihao')
    publish = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    article_id = models.IntegerField(default=0)

    objects = ArticleQuerySet.as_manager()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Blog Article"
        verbose_name_plural = "Blog Articles"
        ordering = ["-created"]
