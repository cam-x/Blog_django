from myblog.models import Article
from django.shortcuts import render, get_list_or_404, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def blog_index(request, category=None):
    if category is None:
        article_list = Article.objects.all()
        paginator = Paginator(article_list, 3)
    else:
        article_list = get_list_or_404(Article, category=category)
        paginator = Paginator(article_list, 3)
    page = request.GET.get('page')
    try:
        # get article objects in the page wanted
        articles = paginator.page(page)
    except PageNotAnInteger:
        # if page is not an integer, deliver first page.
        articles = paginator.page(1)
    except EmptyPage:
        # If page is out of range, deliver last page of results.
        articles = paginator.page(paginator.num_pages)

    return render(request, "base_home.html", dict(paginator=paginator, articles=articles))


def blog_detail(request, category, slug):
    article = get_object_or_404(Article, category=category, slug=slug)
    return render(request, "post.html", dict(article=article))
