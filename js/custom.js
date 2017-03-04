// Offset for Site Navigation
$('#siteNav').affix({
	offset: {
		top: 100
	}
})

$('#footernav').affix({
	offset: {
		bottom: 0
	}
})

//Scrolling related javascript
$.fn.rollup = function ( options ) {
    var settings = $.extend( {
    $wrapper : this,
    $content : $('.scrolling-div-content'),
    speed : 5000
    }, options);
        
    return this.each( function(){
        var $content = settings.$content,
        $content_height = $content.height(),
        $wrapper = settings.$wrapper,
        $wrapper_height = $wrapper.height(),
        $clone = $content.clone(),
        $merge = $.merge( $content, $clone );
            
        //$wrapper.append( $clone );
        function rollUp () {
              $merge.animate({
                  top : -( $content_height ),
              }, settings.speed, 'linear', function () {
                  $merge.css({
                      top : 0
                  });
                  rollUp();
              });
        }
    	
        rollUp();
    
    });
};

$('.scrolling-div').rollup({speed:20000});

$('.scrolling-div').hover(function() {
    $('.scrolling-div-content').stop(true,false);
}, function() {
    $('.scrolling-div').rollup({speed:20000});
});


//Fancy box setup for Contact US
function validateEmail(email) { 
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}

$(document).ready(function() {
    $("#modalbox").fancybox();
    $("#contact").submit(function() { return false; });


    $("#send").on("click", function(){
        var emailval  = $("#email").val();
        var msgval    = $("#msg").val();
        var msglen    = msgval.length;
        var mailvalid = validateEmail(emailval);

        if(mailvalid == false) {
            $("#email").addClass("error");
        }
        else if(mailvalid == true){
            $("#email").removeClass("error");
        }

        if(msglen < 4) {
            $("#msg").addClass("error");
        }
        else if(msglen >= 4){
            $("#msg").removeClass("error");
        }

        if(mailvalid == true && msglen >= 4) {
            // if both validate we attempt to send the e-mail
            // first we hide the submit btn so the user doesnt click twice
            $("#send").replaceWith("<em>sending...</em>");

            $.ajax({
                type: 'POST',
                url: 'sendmessage.php',
                data: $("#contact").serialize(),
                success: function(data) {
                    if(data == "true") {
                        $("#contact").fadeOut("fast", function(){
                            $(this).before("<p><strong>Success! Your feedback has been sent, thanks :)</strong></p>");
                            setTimeout("$.fancybox.close()", 1000);
                        });
                    }
                }
            });
        }
    });
});

//Registration Modal Window
$(function(){
  $('#loginform').submit(function(e){
    return false;
  });
  
  $('#modaltrigger').leanModal({ top: 110, overlay: 0.45, closeButton: ".hidemodal" });
});

function navigation(element) {
	//$(".header-content").hide();
    $('#introduction').hide();
	$('#training').hide();
	$('#indicator').hide();
	$('#contactus').hide();
	$('#disclaimer').hide();
	
	$('#li_home').removeClass("active disabled");
	$('#li_training').removeClass("active disabled");
	$('#li_indicator').removeClass("active disabled");
	$('#li_contactus').removeClass("active disabled");
	
	$('#li_'+element).addClass("active");
	
	if(element=='home') {
	   //$(".header-content").show()
	   location.href="#"
	} else {
	  $('#'+element).show();
	  var url = location.href;               //Save down the URL without hash.
      location.href = "#"+element;                 //Go to the target element.
      history.replaceState(null,null,url);    
	}
	
	
	
}
