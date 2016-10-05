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
	
    var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {
	  modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
});

function ajaxBoardList() {
	$.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
		var contents = "";
		var arr = result.data
		for (var i in arr) {
			contents += "<li>" +
            "<a class='titleLink' href='#' data-no='" + arr[i].no + "'>" +
            "<img src='/TeamProject/mainpage/mainpage_images/suji_1.jpg' alt='Image File'>" +
            "<p>" + arr[i].title + "</p>" +
            "</a>" +
            "</li>"
			
		}
		$("#tabs-1 ul").html(contents);
		$(".titleLink").click(function(event){
			$("#myModal").css({"display":"block"});
			$("html, body").css({"overflow":"hidden"});
			
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
		})
	})
}

function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		$("#no").val(result.data.no);
		$("#title").text(result.data.title);
		$("#url").text(result.data.url);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate2);
		$("#like").text(result.data.like);
		$("#viewCount").text(result.data.viewCount);
		$("#writerNick").text(result.data.writerNick);
	})
}


