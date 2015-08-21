$(function(){

    var pathname = window.location.pathname;

    if (pathname === "/"){
        $("#site-container").css("min-height", "4200px");
    }

    $(window).bind('scroll',function(e){
        parallaxScroll();
    });

    function parallaxScroll(){
        var scrolled = $(window).scrollTop();
        $('#base-layer').css('top',(0-(scrolled*.25))+'px');
        $('#mid-layer').css('top',(0-(scrolled*.75))+'px');
    }



})