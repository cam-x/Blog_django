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
    var sidenav = $("#article-sidenav");

    title_num = 0;
    sub_title_num = 1;
    for(var i = 1; i < h.length; i++)
    {
        h[i].setAttribute('id',i);

        var title = h[i].innerHTML;
        var id = h[i].getAttribute('id');

        var link = document.createElement("a");
        var list = document.createElement("li");

        if (h[i].tagName == 'H4')
        {
            link.innerHTML = title_num.toString() + '.' + sub_title_num.toString() + ' ' + title;
            sub_title_num ++;
            // link = <a href='#id'>title</a>
            link.setAttribute('href', '#' + id);
            // list = <li><a href='#id'>title</a></li>
            list.appendChild(link);
            var sub_ul = document.createElement("ul");
            sub_ul.appendChild(list);
            $("#article-sidenav>li:last-child").append(sub_ul);
        }else
        {
            title_num ++;
            link.innerHTML = title_num.toString() + '. ' + title;
            // link = <a href='#id'>title</a>
            link.setAttribute('href', '#' + id);
            // list = <li><a href='#id'>title</a></li>
            list.appendChild(link);
            sidenav.append(list);
        }
    }



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



    $(function(){
    // name your elements here
    var stickyElement   = '#article-sidenav',   // the element you want to make sticky
        bottomElement   = '.article-nav'; // the bottom element where you want the sticky element to stop (usually the footer)
    // make sure the element exists on the page before trying to initalize
    if($( stickyElement ).length){
        $( stickyElement ).each(function(){

            // let's save some messy code in clean variables
            // when should we start affixing? (the amount of pixels to the top from the element)
            var fromTop = 250;
                // where is the bottom of the element?
                fromBottom = $( document ).height()-($( this ).offset().top + $( this ).outerHeight()),
                // where should we stop? (the amount of pixels from the top where the bottom element is)
                // also add the outer height mismatch to the height of the element to account for padding and borders
                stopOn = $( document ).height()-( $( bottomElement ).offset().top)+($( this ).outerHeight() - $( this ).height());
            // if the element doesn't need to get sticky, then skip it so it won't mess up your layout
            if( (fromBottom-stopOn) > 200 ){
                // let's put a sticky width on the element and assign it to the top
                // assign the affix to the element
                $( this ).affix({
                    offset: {
                        // make it stick where the top pixel of the element is
                        top: fromTop,
                        // make it stop where the top pixel of the bottom element is
                        bottom: stopOn + 400
                    }
                // when the affix get's called then make sure the position is the default (fixed) and it's at the top
                }).on('affix.bs.affix', function(){ $( this ).css('top', 0).css('position', ''); });
            }
            // trigger the scroll event so it always activates
            $( window ).trigger('scroll');
        });
    }


});







});