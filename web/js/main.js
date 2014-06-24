$(document).ready(function() {

    if ($('#blog_articles').length){
        $.ajax({
            url: '../php/get_blog.php',
            type: 'GET',
            data: '',
            dataType: 'html',
            beforeSend: function(){
                $('#article_loader').show();
            },
            success: function(data){
                setTimeout(function(){
                    $('#blog_articles').html(data);
                }, 2000); /* set timeout */
            }, /* success */
            error: function(){
                data = '<a href="/blog">latest posts</a>';
                setTimeout(function(){
                    $('#latest-posts').html(data);
                }, 1000); /* set timeout */
            }, /* error */
            complete: function(){
                setTimeout(function(){
                    $('#article_loader').hide();
                }, 2000); /* set timeout */
            } /* complete */
        }); /* ajax call */
    } /* if blog articles */

    $('#up_arrow').click(function() {
        $.scrollTo($('#top'), {duration: 2000});
    });

    $('#contact_link').click(function() {
        $.scrollTo($('#contact_a'), {duration: 1000});
    });

    $('#projects p:first-child').click(function() {
        $(this).next().next().slideToggle();
    });

    $('#contact_form').submit(function(e) {
        var formURL = $(this).attr("action");
        $.ajax({
            url: '../' + formURL,
            type: 'POST',
            data: $('#contact_form').serialize(),
            dataType: 'text',
            beforeSend: function(){
                $('#form_loader').show();
            },
            success: function(data){
                $('#form_loader').hide();
                alert('Your message has been sent!\nI\'ll get back with you ASAP.\n-Jason');
                $('#name, #email, #message').val('');
                $.scrollTo($('#top'), {duration: 2000});
            }, /* success */
            error: function(){
                $('#form_loader').hide();
                u = 'jsonbrazeal';
                d = 'gmail.com';
                alert('The was an error submitting the form, and your message was not sent. You can try it again or just email me directly at ' + u + '@' + d + '\n-Jason');
            }, /* error */
            complete: function(){
            } /* complete */
        }); /* ajax call */
        e.preventDefault(); // to stop default action
    });

    $(window).scroll(function(e){
      parallax();
    });

    function parallax(){

        var scrolled = $(window).scrollTop();
        $('.scroll_slow').each(function() {
    	   $(this).css('top',-(scrolled*0.3)+'px');
        });

        /* cool effect with footer elements dropping down */
        $('.sink').each(function() {
    	   $(this).css('bottom',(($(document).height() - $(window).height() - scrolled + 200))*0.3 +'px');
        });

        /* animation effects */
        // $('#page_header h1').css('color','rgba(243,242,231,' + (1-(scrolled*0.002))+')');
        // $('#page_header h1').css('color','rgba(243,242,231,' + (1-(scrolled*0.005))+')');
        // $('#page_header h1').css('font-size', 64+scrolled*.8+'px');
        $('#page_header h1').css('letter-spacing', scrolled*.2+'px');

    } /* parallax function */

/* adding this handler using "on" because the element is loaded dynamically by PHP after the DOM is loaded */
$(document).on("click", "#letmeknow", function(){
    $.scrollTo($('#contact_a'), {duration: 1000});
});

}); /* document.ready */