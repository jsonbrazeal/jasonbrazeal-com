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

    /* the honeypot form security stuff start with a request to get the ip address of the client; this should be changed so the form security doesn't rely on the request being successful */
    $.get('http://jsonip.com', function (resp) {
        var ip =  resp.ip;

        /* not making this global so it's not available in the console. */
        var da_key = 'AzL#gT;z@p6ffL+:|)K/9(zd-s%VOA>j``m4>Ej*6p!-3)sVwG}^w|BI]$KY`ZNr';

        var hash = md5(ip + da_key + timestamp);
        var hashIndex = Math.floor(Math.random() * $('#contact_form').children().length);

        /* insert hash field randomly in form and add hash, disguised as a phone number */
        if (Math.floor(Math.random()*2)) {
            $('#contact_form').children().eq(hashIndex).after('<p class="formfield"><label for="phone">phone</label><input type="hidden" value="hash" id="phone" name="phone"></p>');
        }
        else {
            $('#contact_form').children().eq(hashIndex).before('<p class="formfield"><label for="phone">phone</label><input type="hidden" value="hash" id="phone" name="phone"></p>');
        }
        $('#phone').val(hash);

        var timestamp = String($.now());
        var timestampIndex = Math.floor(Math.random() * $('#contact_form').children().length);
        var timestampField = md5(hash + da_key + 'timestamp')

        /* insert hashed timestamp field randomly in form */
        if (Math.floor(Math.random()*2)) {
            $('#contact_form').children().eq(timestampIndex).after('<p class="formfield"><label for="' + timestampField + '">' + timestampField + '</label><input type="hidden" value="' + timestamp + '" id="' + timestampField + '" name="' + timestampField + '"></p>');
        }
        else {
            $('#contact_form').children().eq(timestampIndex).before('<p class="formfield"><label for="' + timestampField + '">' + timestampField + '</label><input type="hidden" value="' + timestamp + '" id="' + timestampField + '" name="' + timestampField + '"></p>');
        }

        var nameField = md5(hash + da_key + 'name');
        var emailField = md5(hash + da_key + 'email');
        var messageField = md5(hash + da_key + 'message');

        $('#rando1').attr('name', nameField);
        $('#rando1').prev().attr('for', nameField);
        $('#rando1').attr('id', nameField);

        $('#rando2').attr('name', emailField);
        $('#rando2').prev().attr('for', emailField);
        $('#rando2').attr('id', emailField);

        $('#rando3').attr('name', messageField);
        $('#rando3').prev().attr('for', messageField);
        $('#rando3').attr('id', messageField);

        injectHoneypots();
    });

    function injectHoneypots(){
        var honeypots = ['name', 'email', 'message'];

        honeypots.forEach(function(name) {

            var honeypotIndex = Math.floor(Math.random() * $('#contact_form').children().length);

            if (Math.floor(Math.random()*2)) {
                $('#contact_form').children().eq(honeypotIndex).after('<p class="formfield"><label for="' + name + '">' + name + '</label><input type="text" id="' + name + '" name="' + name + '"></p>');
            }
            else {
                $('#contact_form').children().eq(honeypotIndex).before('<p class="formfield"><label for="' + name + '">' + name + '</label><input type="text" id="' + name + '" name="' + name + '"></p>');
            }
        });
    } /* injectHoneypots function */

    $('#contact_form').submit(function(e) {
        $('#form_loader').show();

        /* this will be set to true if any of security features are tripped */
        spam = false;

        /* check honeypot fields */
        if ($('#name').val() || $('#email').val() || $('#message').val()) {
            spam = true;
        }

        /* get hash (posing as phone) */
        hash = $('#phone').val();

        /* same key as above function. not making this global so it's not available in the console. */
        var da_key = 'AzL#gT;z@p6ffL+:|)K/9(zd-s%VOA>j``m4>Ej*6p!-3)sVwG}^w|BI]$KY`ZNr';

        /* get hashed fields */
        var timestampField = md5(hash + da_key + 'timestamp');
        timestamp = $('#'+ timestampField).val();

        /* debug */
        // var messageField = md5(hash + da_key + 'message');
        // var nameField = md5(hash + da_key + 'name');
        // var emailField = md5(hash + da_key + 'email');
        // message = $('#'+ messageField).val();
        // name = $('#'+ nameField).val();
        // email = $('#'+ emailField).val();
        // console.log('message=' + message);
        // console.log('name=' +  name);
        // console.log('email=' + email);

        /* check timestamp; users have 15 minutes to fill out the form from page load */
        try {
            formLoadTimeDate = new Date(parseInt(timestamp));
            formLoadTime = formLoadTimeDate.getTime();
            submitTime = $.now();
            submitByTime = formLoadTimeDate.setMinutes(formLoadTimeDate.getMinutes() + 15);

            if (formLoadTime > submitTime) {
                throw 'timestampInFutureException';
            }

            if (submitTime > submitByTime) {
                throw 'tooMuchTimeElapsedException';
            }
        }
        catch (e) {
            spam = true;
            console.log(e);
            /* debug */
            // console.log('formLoadTime=' + formLoadTime);
            // console.log('submitTime=' + submitTime);
            // console.log('submitByTime=' + submitByTime);
        }

        /* only make ajax call if all the security tests above passed */
        if (spam) {
            showErrorPopup();
            console.log('reloading...');
            location.reload();
        }
        else {
            var formURL = $(this).attr('action');
            $.ajax({
                url: '../' + formURL,
                type: 'POST',
                data: {
                    ye_name: $('#'+ md5(hash + da_key + 'name')).val(),
                    ya_email: $('#'+ md5(hash + da_key + 'email')).val(),
                    yo_message: $('#'+ md5(hash + da_key + 'message')).val(),
                    honeypot_name: $('#name').val(),
                    honeypot_email: $('#email').val(),
                    honeypot_message: $('#message').val()
                },
                dataType: 'text',
                beforeSend: function(){
                    // console.log('sending this ' + this.type + ' data: ');
                    // console.log(this.data);
                },
                success: function(data){
                    $('#form_loader').hide();
                    alert('Your message has been sent!\nI\'ll get back with you ASAP.\n-Jason');
                    $('#'+ md5(hash + da_key + 'name')).val('');
                    $('#'+ md5(hash + da_key + 'email')).val('');
                    $('#'+ md5(hash + da_key + 'message')).val('');
                    $.scrollTo($('#top'), {duration: 2000});
                }, /* success */
                error: function(){
                    $('#form_loader').hide();
                    showErrorPopup();
                }, /* error */
                complete: function(){
                } /* complete */
            }); /* ajax call */
        } /* else (no spam, do ajax call) */
        e.preventDefault(); /* to stop default action */
    }); /* #contact_form submit button */

    function showErrorPopup(){
        u = 'jasonbrazeal.com';
        d = 'gmail.com';
        alert('The was an error submitting the form, and your message was not sent. You can refresh the page and try it again or just email me directly at ' + u + '@' + d + '\n-Jason');
    }

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
        $('#page_header h1').css('letter-spacing', scrolled*.15+'px');

    } /* parallax function */

/* adding this handler using "on" because the element is loaded dynamically by PHP after the DOM is loaded */
$(document).on("click", "#letmeknow", function(){
    $.scrollTo($('#contact_a'), {duration: 1000});
});

}); /* document.ready */