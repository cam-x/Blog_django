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
    """ get the article object by category and slug
        get its previous and next article at the same time
    """
    article = get_object_or_404(Article, category=category, slug=slug)
    articles = get_list_or_404(Article, category=category)
    article_previous = None
    article_next = None

    for i in range(len(articles)):
        if articles[i].slug == slug:
            if i == 0:
                article_next = articles[i+1]
                break
            elif i == len(articles) - 1:
                article_previous = articles[i-1]
                break
            else:
                article_previous = articles[i-1]
                article_next = articles[i+1]

    return render(request, "post.html", dict(article=article,
                                             article_previous=article_previous,
                                             article_next=article_next))
