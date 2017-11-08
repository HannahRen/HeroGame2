$(document).ready(function(){
    var slider=$(".slider");
	li_slider=slider.find("li");
	var li_dots=$(".dots li");
	var timer=null;
	var iNow=0;

	li_dots.on("click", function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index=$(this).index();
		li_slider.find("img").fadeOut("slow");
		iNow=index;
		li_slider.eq(iNow).find("img").fadeIn("slow");
	});
	timer=setInterval(function(){
			iNow++;
			if(iNow>li_dots.length-1){
				iNow=0;
			}
			li_dots.eq(iNow).trigger("click");},2000);

	//interact with backend to get news
	 var news_url = "http://games.hoolai.com/cms/?cat=413&json=get_category_posts&include=title,categories,date&count=500";
	 //var news_url="http://10.0.6.28:8000/json.json";
//json文件解析：大类里面有posts数组，每一项里面存放一种新闻，并将这则新闻属于哪些种类放在categories里面，
	$.ajax ({
		url: news_url,
		type: 'GET',
		dataType: 'jsonp',
		//dataType: 'json',
		success: function (data){
			var _data = data.posts;
			var latest = news_list(417, _data);
			var news = news_list(418, _data);
			var announcement = news_list(419, _data);
			var activities =news_list(420, _data);
			console.log(activities)

			$('.content').html(setNewslist(latest,'最新消息',417));
			$('.title1').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('.content').html(setNewslist(latest,'最新消息',417));
			});
			$('.title2').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('.content').html(setNewslist(news, '新闻',418));
				$('.content').find('a').css('width','325px');
			});
			$('.title3').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('.content').html(setNewslist(announcement, '公告',419));
				$('.content').find('a').css('width','325px');
			});
			$('.title4').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('.content').html(setNewslist(activities, '活动',420));
				$('.content').find('a').css('width','325px');
			});

		},
		error: function () {
			alert ('出错了!');
		}
	});
	
	function news_list (id, data) {
		var list =[];
		if(data.length==0) return null;
		for (var j=0; j<data.length;j++) {
			for (var i=data[j].categories.length-1; i>=0;i--){
				if(data[j].categories[i].id==id) {
					list.push(data[j]);
				}
			}
		}
		return list;
	}

	function setNewslist(data, mark, tag) {
		var length=data.length;
		var content_html='';
		if(length>4) {
			for(var i=0;i<4;i++){
				content_html+='<li><span class="mark">'
				+mark+ '</span><a class="news_data" href="http://m.yongzhe.hulai.com/article.html#post_id='+
				data[i].id+'&tag='+tag+'">'+data[i].title+'</a><span class="time">'+data[i].date.substr(0,10)+'</span></li>';
			}
		} else {
			for(var i=0;i<length;i++){
				content_html+='<li><span class="mark">'
				+mark+ '</span><a class="news_data" href="http://m.yongzhe.hulai.com/article.html#post_id='+
				data[i].id+'&tag='+tag+'">'+data[i].title+'</a><span class="time">'+data[i].date.substr(0,10)+'</span></li>';
			}
		}
		return content_html;
	}

	//game materials chosen
	$(".left1").click(function(){
		$(".right1").css("display","block");
		$(".right2").css("display","none");
		$(".right3").css("display","none");
		$(".right4").css("display","none");
	});
	$(".left2").click(function(){
		$(".right1").css("display","none");
		$(".right2").css("display","block");
		$(".right3").css("display","none");
		$(".right4").css("display","none");
	});
	$(".left3").click(function(){
		$(".right1").css("display","none");
		$(".right2").css("display","none");
		$(".right3").css("display","block");
		$(".right4").css("display","none");
	});
	$(".left4").click(function(){
		$(".right1").css("display","none");
		$(".right2").css("display","none");
		$(".right3").css("display","none");
		$(".right4").css("display","block");
	});

	//then return button back to top
	$(".return").click(function(){
		$("html,body").animate({
			"scrollTop":0
		},500)
	});
});
