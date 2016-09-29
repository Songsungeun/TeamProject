
$(document).ready(function(){
	// Activate Carousel
    $("#myCarousel").carousel();
    
    // Enable Carousel Indicators
    $(".item1").click(function(){
        $("#myCarousel").carousel(0);
    });
    $(".item2").click(function(){
        $("#myCarousel").carousel(1);
    });
    $(".item3").click(function(){
        $("#myCarousel").carousel(2);
    });
    $(".item4").click(function(){
        $("#myCarousel").carousel(3);
    });
    
    // Enable Carousel Controls
    $(".left").click(function(){
        $("#myCarousel").carousel("prev");
    });
    $(".right").click(function(){
        $("#myCarousel").carousel("next");
    });
	
	$(function () {
		//$("#tabs").tabs();
		// 탭 jQuery
		$("#tabs >ul >li >a").click(function(){
			$("#tabs >ul >li >a").removeClass("on");
			$("#tabs .conts_inner").css({"display":"none"});
			$(this).addClass("on");
			$("#tabs #tabs-"+($("#tabs >ul >li >a").index(this)+1)).css({"display":"block"});
		});
	});
	
	$(function() {
		$("#includedContent").load("/TeamProject/header.html");
	});
	
	// pop_list
	$(function () {
		//$("#tabs").tabs();
		$("#pop_tabs >ul >li >a").click(function(){
			$("#pop_tabs >ul >li >a").removeClass("on1");
			$("#pop_tabs .pop_cont_in").css({"display":"none"});
			$(this).addClass("on1");
			$("#pop_tabs #pop_tabs-"+($("#pop_tabs >ul >li >a").index(this)+1)).css({"display":"block"});
		});
	});

	
	
});




