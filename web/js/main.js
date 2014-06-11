$(document).ready(function() {

if ($('#blog_articles').length){
    $.ajax({
        url: '../php/get_blog.php',
        type: 'GET',
        data: '',
        dataType: 'html',
        beforeSend: function(){
            $('.loader').show();
        },
        success: function(data){
            $('#blog_articles').html(data);
        },
        error: function(){
            data = '<a href="/blog">latest posts</a>';
            $('#latest-posts').html(data);
        },
        complete: function(){
            $('.loader').hide();
        }
    });
}

$('#up_arrow').click(function() {
    $.scrollTo($('#top'), {duration: 2000});
});

$('#contact_link').click(function() {
    $.scrollTo($('#contact_a'), {duration: 1000});
});

$('#projects p:first-child').click(function() {
    $(this).next().next().slideToggle();
});


/*
  $("#facebook").click(function() {
	window.location = $(this).find("a").attr("href");
	return false;
});
*/
/*

$("small").click(function() {
	window.location = $(this).find("a").attr("href");
	return false;
});

$("#facebook").click(function() {
    window.location = "http://google.com";
});
*/

/*
$('#facebook').hover(function() {
	console.log('hit hover!');
    $(this).css('background', 'url(../img/fi-social-facebook-red.svg) center no-repeat');
    },
    function() {
	console.log('hit hover!');
    $(this).css('background', 'url(../img/fi-social-facebook.svg) center no-repeat');
});
*/


$(window).scroll(function(e){
  parallax();
});

function parallax(){

    var scrolled = $(window).scrollTop();
    $('.scroll_slow').each(function() {
	   $(this).css('top',-(scrolled*0.3)+'px');
    });
/*
	console.log('doc height=');
	console.log($(document).height());
	console.log('win height=');
	console.log($(window).height());
	console.log('scroll top=');
	console.log($(window).scrollTop());
*/

/* 	$(window).scrollTop() + $(window).height() = $(document).height()  when document is scrolled all the way to bottom...as this happens css bottom on footer needs to go from -something to 0 slowly */

/*  cool effect with footer dropping down  */
/*     $('footer').css('bottom',($(document).height() - $(window).height() - scrolled) +'px'); */
$('.sink').each(function() {
	   $(this).css('bottom',(($(document).height() - $(window).height() - scrolled + 200))*0.3 +'px');
    });
/*
    $('#scroll_slow1').css('top',-(scrolled*0.2)+'px');
    $('#page_header').css('top',-(scrolled*0.2)+'px');
*/

    // $('#page_header h1').css('color','rgba(243,242,231,' + (1-(scrolled*0.002))+')');
    // $('#page_header h2').css('font-size', 64+scrolled*.8+'px');
    // $('#page_header h2').css('color','rgba(243,242,231,' + (1-(scrolled*0.005))+')');
    $('#page_header h1').css('letter-spacing', scrolled*.2+'px');


/*

var $window = $(window);
var velocity = 0.4;
function update(){ var pos = $window.scrollTop();
    $('.scroll_slow').each(function() {
        var $element = $(this);
        var height = $element.height();
        $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px');
    });
};
$window.bind('scroll', update);
*/
    }


});