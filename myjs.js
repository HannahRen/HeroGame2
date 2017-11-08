$(document).ready(function(){
    $(function(){
    	var mySwiper=$('.banner').swiper({
    		mode:'horizontal',
    		loop:true,
    		spaceBetween:30,
    		centeredSlides: true,
    		pagination:'.banner .swiper-pagination',
    		paginationClickable: true,
    		autoplay:2500,
    		autoplayDisableOnInteraction: false
    	});
    });

    var news_url = "http://games.hoolai.com/cms/?cat=413&json=get_category_posts&include=title,categories,date&count=500";
    $.ajax ({
        type: 'GET',
        url: news_url,
        dataType: "jsonp",
        success: function (data) {
            var _data = data.posts;
            var latest = news_list (417, _data);
            var news = news_list (418,_data);
            var announcement =news_list(419,_data);
            var activities = news_list (420, _data);

            $('.content ul').html(getNewslist('最新',latest));
            $('.title1').click(function(){
                $('.content ul').html(getNewslist('最新',latest));
                setActive($(this));
            });
            $('.title2').click(function(){
                $('.content ul').html(getNewslist('新闻',news));
                setActive($(this));
            });
            $('.title3').click(function(){
                $('.content ul').html(getNewslist('公告',announcement));
                setActive($(this));
            });
            $('.title4').click(function(){
                $('.content ul').html(getNewslist('活动',activities));
                setActive($(this));
            });
        },
        error: function (){
            alert ('加载失败！');
        }
    });

    function news_list(tag, data){
        var list = [];
        if (data.length == 0 ) return null;
        else {
            for (var j=0;j<data.length;j++) {
                for (var i=data[j].categories.length-1;i>=0;i--){
                    if (data[j].categories[i].id==tag){
                        list.push(data[j]);
                    }
                }
            }
        }
        return list;
    }

    function getNewslist (title, data) {
        var length=data.length;
        var content_html='';
        if (length>4) {
            for (var i=0;i<4;i++){
                content_html += '<li><span class="mark">'+title+'</span><a href="http://yongzhe.hulai.com/article.html#'
                +data[i].id+'">'+data[i].title+'</a><span class="time">'+data[i].date.substr(0,10)+'</span></li>';
            }
        } else {
            for (var i=0;i<data.length;i++){
                content_html += '<li><span class="mark">'+title+'</span><a href="http://yongzhe.hulai.com/article.html#'
                +data[i].id+'">'+data[i].title+'</a><span class="time">'+data[i].date.substr(0,10)+'</span></li>';
            }
        }
        return content_html;
    }

    function setActive (e){
        e.addClass('active').siblings().removeClass('active');
    }


    $(function(){
    	var swiper=$('.case').swiper({
    		slidesPerView: 3,
    		mode:'horizontal',
    		loop:true,
    		spaceBetween: 30,
    		prevButton:'.case .swiper-button-prev',
    		nextButton:'.case .swiper-button-next',
    		autoplay:2500,
    		autoplayDisableOnInteraction: false
    	});
	    $('.case .swiper-slide').click(function(){
	    	var src=$(this).find('img').attr('src');
	    	var index=src.substr(13,1);
	    	$('.cover').css('display','block');
	    	$('.hd_bg').css('display','block');
	    	$('.hd_image').attr('src', 'images/bottomhd'+index+'.png');
	    	swiper.stopAutoplay();
	    	$('body').css('overflow','hidden');
	    });
	    $('.close_hd').click(function(){
	    	$('.cover').css('display','none');
	    	$('.hd_bg').css('display','none');
	    	swiper.startAutoplay();
	    	$('body').css('overflow','auto');
	    });
    });
    
});
