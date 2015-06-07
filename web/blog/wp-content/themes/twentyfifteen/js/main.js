(function($) {
$(document).ready(function() {

$('.entry-footer .nav-links').addClass('clearfix');

$('.comment-metadata a').click(function() { return false; });

$('#up_arrow').click(function() {
    $.scrollTo($('#top'), {duration: 1000});
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

}
/*
    $('#scroll_slow1').css('top',-(scrolled*0.2)+'px');
    $('#page_header').css('top',-(scrolled*0.2)+'px');
*/
    /*
    $('#page_header h1').css('color','rgba(243,242,231,' + (1-(scrolled*0.002))+')');
    $('#page_header h1').css('font-size', 64+scrolled*.8+'px');
    $('#page_header h2').css('color','rgba(243,242,231,' + (1-(scrolled*0.005))+')');
    $('#page_header h2').css('letter-spacing', scrolled*.2+'px');
    */

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


            });
})(jQuery);


// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.11
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));

/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.3.4
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var g=location.href.replace(/#.*/,'');var h=$.localScroll=function(a){$('body').localScroll(a)};h.defaults={duration:1000,axis:'y',event:'click',stop:true,target:window};$.fn.localScroll=function(b){b=$.extend({},h.defaults,b);if(b.hash&&location.hash){if(b.target)window.scrollTo(0,0);scroll(0,location,b)}return b.lazy?this.bind(b.event,function(e){var a=$([e.target,e.target.parentNode]).filter(filter)[0];if(a)scroll(e,a,b)}):this.find('a,area').filter(filter).bind(b.event,function(e){scroll(e,this,b)}).end().end();function filter(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==g&&(!b.filter||$(this).is(b.filter))}};h.hash=function(){};function scroll(e,a,b){var c=a.hash.slice(1),elem=document.getElementById(c)||document.getElementsByName(c)[0];if(!elem)return;if(e)e.preventDefault();var d=$(b.target);if(b.lock&&d.is(':animated')||b.onBefore&&b.onBefore(e,elem,d)===false)return;if(b.stop)d._scrollable().stop(true);if(b.hash){var f=elem.id===c?'id':'name',$a=$('<a> </a>').attr(f,c).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});elem[f]='';$('body').prepend($a);location.hash=a.hash;$a.remove();elem[f]=c}d.scrollTo(elem,b).trigger('notify.serialScroll',[elem])};return h}));