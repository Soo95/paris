$(document).ready(function(){
    $('.bar').click(function(){
        //bar에 클릭 시 active를 토글
        $(this).toggleClass('active');
        // bar 클릭 시 서브메뉴 오른쪽에서 펼쳐짐
        var class_name = $('#overlay').attr('class'); 
        if(class_name=='sub_bg'){
            $('#overlay').animate({opacity: "0.7"}, 500, function(){
                $('#overlay').attr('class', 'sub_bg_on');
                $('#sub_area').attr('class', 'sub');
                $('.sub').animate({'margin-right':0});  
            });
        }else{
            $('#overlay').animate({opacity: "0"}, 500, function(){
                $('#overlay').attr('class', 'sub_bg');
                $('#sub_area').attr('class', 'sub');
                $('.sub').animate({'margin-right':-500});
            });
        }
    });
    jQuery(function($) {


        /* **************************************** *
         * GLOBALS
         * **************************************** */
        
        /**
         * skrollr element
         */
        var skr = null;
        
        
        
        /* **************************************** *
         * INIT
         * **************************************** */
        main_event_visual();
        main_visual();
        
        
        // main event visual slider
        function main_event_visual() {
        
            if ( $( '#main-event-banner-img-container' ).length > 0 ) {
        
                var $wrap = $( '#main-event-banner-img-container' );
        
                if ( $( '.swiper-slide', $wrap ).length > 1 ) {
        
                    var time            = 5000;
                    var transition_time = 1200;
                    var main_event_img_swiper;
                    var main_event_txt_swiper;
        
                    // update data parallax attr (rwd 디버깅)
                    $( '.main_event_img' ).attr( 'data-swiper-parallax-x', $wrap.width() );
        
                    main_event_txt_swiper = new Swiper( '#main-event-banner-txt-container', {
                        effect      : 'fade',
                        loop        : true,
                        parallax    : true,
                        speed       : transition_time,
                        pagination  : {
                                        el          : '.main-event-banner-pagination',
                                        clickable   : true,
                                    },
                        autoplay    : { delay: time }
                    } );
        
                    main_event_img_swiper = new Swiper( '#main-event-banner-img-container', {
                        width       : $wrap.width(),
                        parallax    : true,
                        loop        : true,
                        speed       : transition_time
                    } );
        
                    // get multi swiper instances to control each other
                    main_event_txt_swiper.controller.control = [ main_event_img_swiper ];
                    main_event_img_swiper.controller.control = [ main_event_txt_swiper ];
        
                    // setInterval( function () { main_event_txt_swiper.slideNext(); }, 1000 );
        
                }
        
            }
        
        }
        
        
        
        // Main visual
        function main_visual(){
        
            if($('#main_visual_bg_container').length <= 0) return;
        
            // update data parallax attr (rwd 디버깅)
            $('.main_visual_item_img').attr('data-swiper-parallax-x',$('#main_visual_product_container').width())
        
            // Timer
            var time = 4000;
            var transition_time = 1200;
            var time_with_trans = (time+transition_time)/1000;
            var timer = new TweenMax.to('.main_visual_timer_current',time/1000,{scaleX:1,ease:Linear.easeNone,onComplete: function(){
                  main_visual_swiper.slideNext();
                }
            });
        
            timer.pause();
        
            // Text timeline
            main_visual_text(0,null,true);
        
        
            // Init swiper
            var main_visual_bg_swiper = new Swiper('#main_visual_bg_container', {
                direction: 'vertical',
                parallax: true,
                loop : true,
                speed : transition_time,
            });
        
            /*
            var main_visual_text_swiper = new Swiper('#main_visual_text_container', {
                direction: 'vertical',
                parallax: true,
                loop : true,
            });
            */
        
            var main_visual_swiper = new Swiper('#main_visual_product_container', {
                //slidesPerView: 'auto',
                //autoplay:{
                    //delay: time
                //},
                loop : true,
                speed : transition_time,
                parallax: true,
                pagination: {
                    el: '.main_visual_pagination',
                    type: 'fraction',
                },
                navigation: {
                    nextEl: '.main_visual_control_next',
                    prevEl: '.main_visual_control_prev',
                },
                on : {
                    init: function () {
                        timer.restart();
                    },
                    transitionStart : function(){
        
                        timer.duration(time_with_trans)
                        timer.restart();
                    }
                }
                /*
                pagination: {
                    el: '.history_swiper_pagination',
                    type: 'custom',
                    renderCustom: function (swiper, current, total) {
                        var scale = (current-1) / (total-1);
                        var scaleX = 1;
                        var scaleY = 1;
        
                        scaleX = scale;
        
                        $('.history_swiper_pagination').find('.swiper-pagination-progressbar-fill').css({
                            transform : "translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")",
                            transition : swiper.params.speed+'ms'
                        })
                    }
                },
                */
        
            });
        
            // get multi swiper instances to control each other
            main_visual_swiper.controller.control = [main_visual_bg_swiper];
        
        
            //main_visual_bg_swiper.controller.control = [main_visual_swiper,main_visual_text_swiper];
            //main_visual_text_swiper.controller.control = [main_visual_swiper,main_visual_bg_swiper];
        
            var slide_change_flag = 0;
        
            main_visual_swiper.on('slideChange', function(){
        
                    var current_slide = this.previousIndex;
                    var new_slide = this.realIndex;
                    var first_title_txt = $('.main_visual_text_item_content_title:first').text()
        
                    main_visual_text(current_slide,new_slide,false);
        
            });
        
        }
        
        
        function main_visual_text(current_slide,new_slide,first){
        
            var delay = (first === true) ? 0 : .1;
            var tl = new TimelineMax({delay: delay, paused:1});
            var tl_p = new TimelineMax({delay: delay,paused:1});
            var tl_btn = new TimelineMax({delay: delay,paused:1});
        
            var $list_item = $('.main_visual_text_item:first-child');
            var title,title_chars,p,p_lines, $btn;
        
            TweenMax.set($list_item.find('.main_visual_text_item_content_title:first'),{autoAlpha : 1});
            TweenMax.set($list_item.find('.main_visual_text_item_content_desc:first'),{autoAlpha : 1});
        
            if(first){
        
                new_slide = 0;
                
                if(!$('html').hasClass('mobile')){
                    
                    title = new SplitText($('.main_visual_text_item_content_title:first'), {type:"chars, lines", charsClass: 'chars', linesClass: 'lines'});
                    title_chars = title.chars;
                    
                    p = new SplitText($('.main_visual_text_item_content_desc:first'), {type:"lines", linesClass: 'lines'});
                    p_lines = p.lines;
        
                } else {
                    
                    title = $('.main_visual_text_item_content_title:first');
                    p = $('.main_visual_text_item_content_desc:first');
                    
                }
                
                $btn = $('.main_visual_text_item_content_btn:first');
        
                //$('.main_visual_text_item:first').attr('data-first-text', $list_item.find('.main_visual_text_item_content_title:first').text());
                $('.main_visual_text_item:first-child').clone().addClass('main_visual_text_item_placeholder').appendTo('#main_visual_text_container');
        
                //tl.staggerFrom(title_chars, 0.8, {y:80, ease:Power2.easeOut }, 0.04);
                //tl_p.staggerFrom(p_lines, 0.8, {y:30, autoAlpha:0, ease:Power2.easeOut }, 0.04);
                //tl_btn.from($btn,0.8, {y:30, autoAlpha:0, ease:Power2.easeOut })
        
            }else{
                
                if(!$('html').hasClass('mobile')){
        
                    // hide
                    tl.staggerTo($('.main_visual_text_item:first-child').find('.chars'), 0.5, {y:80, ease:Power2.easeIn}, 0.04,0, function(){
        
                        var next_title = $('.main_visual_text_item:eq('+new_slide+')').find('.main_visual_text_item_content_title').text();
                        var $title = $list_item.find('.main_visual_text_item_content_title');
        
                        if(new_slide === 0){
                            next_title = $('.main_visual_text_item_placeholder').find('.main_visual_text_item_content_title').text();
                        }
        
                        $title.text(next_title);
                        title = new SplitText($('.main_visual_text_item_content_title:first'), {type:"chars,lines", charsClass: 'chars', linesClass: 'lines'});
                        title_chars = title.chars;
        
                        TweenMax.staggerFrom(title_chars, 0.5, {y:80, ease:Power2.easeOut }, 0.04);
        
                    });
        
                    tl_p.staggerTo($('.main_visual_text_item:first-child').find('.lines'), 0.5, {y:30,autoAlpha:0, ease:Power2.easeIn}, -0.04,0, function(){
        
                        var next_p = $('.main_visual_text_item:eq('+new_slide+')').find('.main_visual_text_item_content_desc').get(0).innerHTML;
                        var $p = $list_item.find('.main_visual_text_item_content_desc');
        
                        if(new_slide === 0){
                            next_p = $('.main_visual_text_item_placeholder').find('.main_visual_text_item_content_desc').get(0).innerHTML;
                        }
        
                        $p.html(next_p);
                        p = new SplitText($('.main_visual_text_item_content_desc:first'), {type:"lines", linesClass: 'lines'});
                        p_lines = p.lines;
        
                        TweenMax.staggerFrom(p_lines, 0.5, {delay:0.8,y:30,autoAlpha:0, ease:Power2.easeOut }, 0.04);
        
                    });
                    
                } else {
                    
                    // hide
                    tl.staggerTo($('.main_visual_text_item:first-child .main_visual_text_item_content_title'), 0.5, {y:80, autoAlpha:0, ease:Power2.easeIn}, 0.04,0, function(){
        
                        var next_title = $('.main_visual_text_item:eq('+new_slide+')').find('.main_visual_text_item_content_title').text();
                        var $title = $list_item.find('.main_visual_text_item_content_title');
        
                        if(new_slide === 0){
                            next_title = $('.main_visual_text_item_placeholder').find('.main_visual_text_item_content_title').text();
                        }
        
                        $title.text(next_title);
                        title = $('.main_visual_text_item_content_title');
        
                        TweenMax.fromTo(title, 0.5, {y:80, autoAlpha:0},{y:0, autoAlpha:1, ease:Power2.easeOut }, 0.04);
        
                    });
        
                    tl_p.staggerTo($('.main_visual_text_item:first-child .main_visual_text_item_content_desc'), 0.5, {y:30,autoAlpha:0, ease:Power2.easeIn}, -0.04,0, function(){
        
                        var next_p = $('.main_visual_text_item:eq('+new_slide+')').find('.main_visual_text_item_content_desc').get(0).innerHTML;
                        var $p = $list_item.find('.main_visual_text_item_content_desc');
        
                        if(new_slide === 0){
                            next_p = $('.main_visual_text_item_placeholder').find('.main_visual_text_item_content_desc').get(0).innerHTML;
                        }
        
                        $p.html(next_p);
                        p = $('.main_visual_text_item_content_desc');
        
                        TweenMax.fromTo(p, 0.5, {y:30,autoAlpha:0 }, {delay:0.15,y:0,autoAlpha:1, ease:Power2.easeOut }, 0.04);
        
                    });
                    
                }
                
                tl_btn.to($('.main_visual_text_item:first-child').find('.main_visual_text_item_content_btn'),0.3, {y:30, autoAlpha:0, ease:Power2.easeIn,onComplete :function(){
        
                    var next_btn = $('.main_visual_text_item:eq('+new_slide+')').find('.main_visual_text_item_content_btn').get(0).innerHTML;
                    var $btn = $list_item.find('.main_visual_text_item_content_btn').first();
        
        
                    if(new_slide === 0){
                        next_btn = $('.main_visual_text_item_placeholder').find('.main_visual_text_item_content_btn').get(0).innerHTML;
                    }
        
                    $btn.html(next_btn);
                    
                    if(!$('html').hasClass('mobile')){
                    
                        TweenMax.to($('.main_visual_text_item_content_btn:first'), 0.5, {delay:1.5,y:0,autoAlpha:1, ease:Power2.easeOut });
                        
                    } else {
                        
                        TweenMax.to($('.main_visual_text_item_content_btn:first'), 0.5, {delay:0.5,y:0,autoAlpha:1, ease:Power2.easeOut });
                        
                    }
                }})
                
                tl.play();
                tl_p.play();
                tl_btn.play()
        
            }
        
        }
        
        
        }); //End jQuery
    //마우스 hover 시 nav ul li 위의 dot이 left 0 에서 50%까지 움직이는 애니메이션
    var dot=$('.dot');
    var posMenu=0;
    var widthMenu=0;
    var resPos=0;
    $('nav ul li').hover(function(){
        posMenu=$(this).find('a').offset().left;
        widthMenu=$(this).find('a').width()/2-5;
        resPos=posMenu+widthMenu;
        dot.stop().animate({'width':'5px','height':'5px','left':resPos});
    });
    $('nav').mouseleave(function(){
        dot.stop().animate({'width':'0px','height':'0px','left':resPos});
    });
    //사진에 hover하면 글자색과 배경색 바뀜(1번째)
    $('#block1').mouseover(function(){
        $('section .sec-content .bread-list ul li:first-child').css("background-color","#f29e38");
        $('section .sec-content .bread-list ul li:first-child h4').css("color","#fff");
        $('section .sec-content .bread-list ul li:first-child .banner').css("background-color","#fff");
        $('section .sec-content .bread-list ul li:first-child .banner h5').css("color","#023586");
        $('section .sec-content .bread-list ul li:first-child h3').css("color","#fff");
        $('section .sec-content .bread-list ul li:first-child p').css("color","#fff");
    });
    $('#block1').mouseleave(function(){
        $('section .sec-content .bread-list ul li:first-child').css("background-color","#fff3de");
        $('section .sec-content .bread-list ul li:first-child h4').css("color","#023586");
        $('section .sec-content .bread-list ul li:first-child .banner').css("background-color","#023586");
        $('section .sec-content .bread-list ul li:first-child .banner h5').css("color","#fff");
        $('section .sec-content .bread-list ul li:first-child h3').css("color","#023586");
        $('section .sec-content .bread-list ul li:first-child p').css("color","#023586");
    });
    //사진에 hover하면 글자색과 배경색 바뀜(2번째)
    $('#block2').mouseover(function(){
        $('section .sec-content .bread-list ul li:nth-child(2)').css("background-color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(2) h4').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(2) .banner').css("background-color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(2) .banner h5').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(2) h3').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(2) p').css("color","#fff");
    });
    $('#block2').mouseleave(function(){
        $('section .sec-content .bread-list ul li:nth-child(2)').css("background-color","#fff3de");
        $('section .sec-content .bread-list ul li:nth-child(2) h4').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(2) .banner').css("background-color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(2) .banner h5').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(2) h3').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(2) p').css("color","#023586");
    });
    //사진에 hover하면 글자색과 배경색 바뀜(3번째)
    $('#block3').mouseover(function(){
        $('section .sec-content .bread-list ul li:nth-child(3)').css("background-color","#d9b991");
        $('section .sec-content .bread-list ul li:nth-child(3) h4').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(3) .banner').css("background-color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(3) .banner h5').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(3) h3').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(3) p').css("color","#fff");
    });
    $('#block3').mouseleave(function(){
        $('section .sec-content .bread-list ul li:nth-child(3)').css("background-color","#fff3de");
        $('section .sec-content .bread-list ul li:nth-child(3) h4').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(3) .banner').css("background-color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(3) .banner h5').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(3) h3').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(3) p').css("color","#023586");
    });
    //사진에 hover하면 글자색과 배경색 바뀜(4번째)
    $('#block4').mouseover(function(){
        $('section .sec-content .bread-list ul li:nth-child(4)').css("background-color","#a06650");
        $('section .sec-content .bread-list ul li:nth-child(4) h4').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(4) .banner').css("background-color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(4) .banner h5').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(4) h3').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(4) p').css("color","#fff");
    });
    $('#block4').mouseleave(function(){
        $('section .sec-content .bread-list ul li:nth-child(4)').css("background-color","#fff3de");
        $('section .sec-content .bread-list ul li:nth-child(4) h4').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(4) .banner').css("background-color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(4) .banner h5').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(4) h3').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(4) p').css("color","#023586");
    });
    //사진에 hover하면 글자색과 배경색 바뀜(5번째)
    $('#block5').mouseover(function(){
        $('section .sec-content .bread-list ul li:nth-child(5)').css("background-color","#d9946c");
        $('section .sec-content .bread-list ul li:nth-child(5) h4').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(5) .banner').css("background-color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(5) .banner h5').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(5) h3').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(5) p').css("color","#fff");
    });
    $('#block5').mouseleave(function(){
        $('section .sec-content .bread-list ul li:nth-child(5)').css("background-color","#fff3de");
        $('section .sec-content .bread-list ul li:nth-child(5) h4').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(5) .banner').css("background-color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(5) .banner h5').css("color","#fff");
        $('section .sec-content .bread-list ul li:nth-child(5) h3').css("color","#023586");
        $('section .sec-content .bread-list ul li:nth-child(5) p').css("color","#023586");
    });
    //사진에 hover하면 글자색과 배경색 바뀜(6번째)
    $('#block6').mouseover(function(){
        $('section .sec-content .bread-list ul li:last-child').css("background-color","#f25430");
        $('section .sec-content .bread-list ul li:last-child h4').css("color","#fff");
        $('section .sec-content .bread-list ul li:last-child .banner').css("background-color","#fff");
        $('section .sec-content .bread-list ul li:last-child .banner h5').css("color","#023586");
        $('section .sec-content .bread-list ul li:last-child h3').css("color","#fff");
        $('section .sec-content .bread-list ul li:last-child p').css("color","#fff");
    });
    $('#block6').mouseleave(function(){
        $('section .sec-content .bread-list ul li:last-child').css("background-color","#fff3de");
        $('section .sec-content .bread-list ul li:last-child h4').css("color","#023586");
        $('section .sec-content .bread-list ul li:last-child .banner').css("background-color","#023586");
        $('section .sec-content .bread-list ul li:last-child .banner h5').css("color","#fff");
        $('section .sec-content .bread-list ul li:last-child h3').css("color","#023586");
        $('section .sec-content .bread-list ul li:last-child p').css("color","#023586");
    });
    $(window).mousemove(function(e){
        parallaxIt(e, ".back-img",-30);
        parallaxIt(e, ".attach-img", -100);

    });
    function parallaxIt(e, target, movement){
        var $this = $('.back-img');
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top

        TweenMax.to(target, 1,{
            x:(relX - $this.width()/2)/$this.width()*movement,
            y:(relY - $this.height()/2)/$this.height()*movement
        });
    }
    //top클릭하면 상단이동
    $('.top').click(function(){
       $('html,body').animate({scrollTop:0});
    });
});