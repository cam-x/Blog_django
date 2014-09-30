from django.views import generic
from myblog.models import Article
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def blog_index(request, category=None):
    if category is None:
        article_list = Article.objects.all()
        paginator = Paginator(article_list, 10)
        page = 1
    else:
        article_list = Article.objects.filter(category=category)
        paginator = Paginator(article_list, 10)
        page = request.GET.get('page')

    try:
        articles = paginator.page(page)
    except PageNotAnInteger:
        # if page is not an integer, deliver first page.
        articles = paginator.page(1)
    except EmptyPage:
        # If page is out of range, deliver last page of results.
        articles = paginator.page(paginator.num_pages)

    return render(request, "base_home.html", dict(paginator=paginator, articles=articles))


class BlogDetail(generic.DetailView):
    model = Article
    template_name = "post.html"
