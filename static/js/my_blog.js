/**
 * Created by Jianqiao on 25/09/14.
 */

$(document).ready(function () {



    var row_list = $("a>.col-md-8");

    row_list.mouseenter(function(){
        $(this).addClass("special");
    });

    row_list.mouseleave(function(){
        $(this).removeClass("special");
    });


    var h = $(":header");
    var sidenav = $("#doc-sidenav");

    for(var i = 1; i < h.length; i++)
    {
        h[i].setAttribute('id',i);

        var title = h[i].innerHTML;
        var id = h[i].getAttribute('id');

        var link = document.createElement("a");
        var list = document.createElement("li");

        link.innerHTML = title;
        // link = <a href='#id'>title</a>
        link.setAttribute('href', '#' + id);
        // list = <li><a href='#id'>title</a></li>
        list.appendChild(link);


        if (h[i].tagName == 'H4')
        {

            var sub_ul = document.createElement("ul");
            sub_ul.appendChild(list);
            $("#doc-sidenav>li:last-child").append(sub_ul);

        }
        else
        {
            sidenav.append(list);
        }
    }

    sidenav.affix({
        offset: {
            top: 0
        }
    });


    $(window).bind("scroll", function(){

        // 获取网页文档对象滚动条的垂直偏移
        var scrollTopNum = $(document).scrollTop(),
        // 获取浏览器当前窗口的高度
            winHeight = $(window).height(),
            go_top = $("div.back-to-top");

        // 滚动条的垂直偏移大于 0 时显示，反之隐藏
        (scrollTopNum > 300) ? go_top.fadeIn("fast") : go_top.fadeOut("fast");

        // 给 IE6 定位
        if (!-[1,]&&!window.XMLHttpRequest) {
            go_top.css("top", scrollTopNum + winHeight - 200);
        }

    });

    // 点击按钮后，滚动条的垂直方向的值逐渐变为0，也就是滑动向上的效果
    $("div.back-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

});