$(document).ready(function(){


/* Button Hover Function */ 

$(".button").hover(
function() {
	$(this).toggleClass("hoveri", 300);

},
function() {
	$(this).toggleClass("hoveri", 300);
});


/* Backstretch Backgrounds Function */ 

$(".main-section-w, .testia-w").backstretch([
        "img/barBg0.jpg","img/barBg1.jpg",  "img/barBg2.jpg","img/barBg3.jpg","img/barBg4.jpg","img/barBg5.jpg","img/barBg6.jpg","img/barBg7.jpg","img/barBg8.jpg"
  ], {duration: 6000, fade: 750});
 
 
$('.testi-w').cycle({ 
    fx:    'fade', 
    speed:  2500 
 });



});


/*---------  Contact Form -------*/

$(document).ready(function(){
    $("#pop-contact").click(function(){
    $("#overlay_form").fadeIn(1000);
    $("#popi-bg").css({
    "opacity": "0.7"
    }); 
    $("#popi-bg").fadeIn("slow");
    positionPopup();
    });
    $("#close2").click(function(){
    $("#overlay_form").fadeOut(500);
    $("#popi-bg").fadeOut("slow");

    });
 
});

$(document).ready(function(){
    $("#pop-privacy").click(function(){
    $("#overlay_form2").fadeIn(1000);
    $("#popi-bg").css({
    "opacity": "0.7"
    }); 
    $("#popi-bg").fadeIn("slow");
    positionPopup2();
    });
    $("#close22").click(function(){
        $("#overlay_form2").fadeOut(500);
        $("#popi-bg").fadeOut("slow");

    });
 
});
    
function positionPopup(){
    if(!$("#overlay_form").is(':visible')){
        return;
    }
    $("#overlay_form").css({
    left: ($(window).width() - $('#overlay_form').width()) / 2,
    top: ($(window).width() - $('#overlay_form').width()) / 6,
    position:'absolute'
    });
}
function positionPopup2(){
    if(!$("#overlay_form2").is(':visible')){
        return;
    }
    $("#overlay_form2").css({
    left: ($(window).width() - $('#overlay_form2').width()) / 2,
    top: ($(window).width() - $('#overlay_form2').width()) / 6,
    position:'absolute'
    });
}
$(window).bind('resize',positionPopup);


$(document).ready(function(){
    $("div.b").hover(
    function() {
    $(this).stop().animate({"opacity": "0.5","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(opacity=50)"}, "800");
    },
    function() {
    $(this).stop().animate({"opacity": "0","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(opacity=0)"}, "fast");
    });

});

/*--------- Input auto-clear -------*/

    $(function(){
    $('input:text, textarea').each(function(){
    var txtval = $(this).val();
    $(this).focus(function(){
    $(this).val('')
    });
    $(this).blur(function(){
    if($(this).val() == ""){
    $(this).val(txtval);
    }
    });
    });
    });
    
    
$(document).ready(function() {
				
				//$("#mc-embedded-subscribe-form").submit(function() { return false; });


		$("#mc-embedded-subscribe").on("click", function(){
			//var emailval2  = $("#mce-EMAIL").val();
			$(".subscribe p").replaceWith("<p><span>Thank you !</span> You have been subscribed<p>");
				
			/*	$.ajax({
					type: 'POST',
					url: 'http://formlifting.us8.list-manage.com/subscribe/post?u=9f689c24234f2ec7696adb09e&amp;id=577f6d7291',
					data: $("#mc-embedded-subscribe-form").serialize(),
                    crossDomain : true,
					success: function(data) {
						if(data == "true") {
							$("em").fadeOut("fast", function(){
								$(this).before("<p> Your Message has been sent.</p>");
								setTimeout("$.fancybox.close()", 1000);
							});
						}
					}
				});
                */
		});
});


