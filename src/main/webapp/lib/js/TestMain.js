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
	
//	var span = document.getElementsByClassName("close")[0];
//	span.onclick = function() {
//	  modal.style.display = "none";
//	}
//	// When the user clicks anywhere outside of the modal, close it
//    var modal = document.getElementById('myModal');
//	window.onclick = function(event) {
//	  if (event.target == modal) {
//	    modal.style.display = "none";
//	  }
//	}
});
function ajaxBoardList() {
	$.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		var template1 = Handlebars.compile($('#liTemplateText').html())
		$("#tabs-1 > .tabs-1-contents").html(template1(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			//$("#myModal").css({"display":"block"});
			//$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
			ajaxPostPTComentsList(no)
		})
//		$("#close-Btn").click(function() {
//			$("#myModal").css({"display":"none"});
//			$("#super_HTML").css({"overflow":"auto"});
//		})
	})
}

function ajaxBoardPopList() {
	$.getJSON(serverAddr + "/mainpage/mostPost.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		var contents = ""
	    var arr = result.data
	    for (var i in arr) {
	    	contents += "<li class='pop_list'>" +
	    	"<a class='pop_list_Link' href='#' data-no='" + arr[i].no + "'>" +
	    	"<span class='popNo'>"+ (parseInt(i)+1) +"</span>" +
	    	"<span class='popConts'>" + arr[i].title +"</span>" +
	    	"</a>" +
	    	"</li>"
	    }
	    $("#pop_tabs-1 > .pop_tabs-1-conts").html(contents)
	    $(".pop_list_Link").click(function(event){
	    	$("#myModal").modal();
	    	/*$("#myModal").css({"display":"block"});
			$("html").css({"overflow":"hidden"});*/
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
			ajaxPostPTComentsList(no)
		})
		
		$("#close-Btn").click(function() {
			$("#myModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
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
		$("#writerNick").text(result.data.writerNick);
		$("#url_location").html(result.data.linkTitle);
		$("#post_user_id").text(result.data.email);
		$("#viewCount").text(result.data.viewCount);
		$("#like").text(result.data.like);
		console.log(result.data.email)
		$(".post_url > #url").click(function(event) {
				console.log("url 눌림");
				console.log(result.data.url);
	//			location.href = result.data.url;
//				window.open(result.data.url);
		})
	})
}
function ajaxPostPTComentsList(no) {
	$.getJSON(serverAddr + "/mainpage/parentCmtList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	return
	    }
		var contents = ""
	    var arr = result.data
	    for (var i in arr) {
	    	contents += "<div class='coment_wrap'>" +
	    	  "<div class='coment_info'>" +
	            "<a class='cmt_userNick' href='#' data-no'" + arr[i].userNo + "'>" + arr[i].writerNick + "</a>" +
	            "<span class='cmt_conts'>" + arr[i].parentComnet + "</span>" +
	          "</div>" +
	          "<div class='coment_ud'>" +
	    	    "<span class='cmt_createdDate'>" + arr[i].comentCreatedDate + "</span>" +
	    	    "<a class='cmt_reply' href='#' data-no='" + arr[i].parentComentNo + "'>답글달기</a>" +
	            "<a class='cmt_update' style='display: none;'>수정</a>" +
	            "<a class='cmt_delete' style='display: none;'>삭제</a>" +
	          "</div>" +
            "<div class='reply_wrap'>" +
            "</div>" +
	        "</div>"
	    }
	    $(".post_cmt_list > .cmts_list").html(contents);
	    ajaxPostCHComentsList(no)
//	    ajaxPostCHComentsList();
//	    $(".pop_list_Link").click(function(event){
//			$("#myModal").css({"display":"block"});
//			$("html").css({"overflow":"hidden"});
//			var no = $(this).attr("data-no")
//			console.log(no)
//			ajaxLoadBoard(no)
//		})
//		$("#close-Btn").click(function() {
//			$("#myModal").css({"display":"none"});
//			$("#super_HTML").css({"overflow":"auto"});
//		})
    })
}

function ajaxPostCHComentsList(no) {
	$.getJSON(serverAddr + "/mainpage/childCmtList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		var contents = ""
	    var arr = result.data
	    for (var i in arr) {
	    	contents += "<div class='coment_replyArea'>" +
              "<div class='reply_coment_info'>" +
	              "<a class='reply_cmt_userNick' href='#' data-no='" + arr[i].userNo + "'>" + arr[i].writerNick + "</a>" +
                "<span class='reply_cmt_conts'>" + arr[i].childComent + "</span>" +
              "</div>" +
              "<div class='reply_coment_ud'>" +
	            "<span class='reply_cmt_createdDate'>" + arr[i].comentCreatedDate + "</span>" +
	            "<a class='cmt_reply' href='#' data-no='" + arr[i].chileComentNo + "'>답글달기</a>" +
                "<a class='reply_cmt_update' style='display: none;'>수정</a>" +
                "<a class='reply_cmt_delete' style='display: none;'>삭제</a>" +
              "</div>" +
            "</div>"
	    }
	    $(".coment_wrap > .reply_wrap").html(contents);
//	    $(".pop_list_Link").click(function(event){
//			$("#myModal").css({"display":"block"});
//			$("html").css({"overflow":"hidden"});
//			var no = $(this).attr("data-no")
//			console.log(no)
//			ajaxLoadBoard(no)
//		})
//		$("#close-Btn").click(function() {
//			$("#myModal").css({"display":"none"});
//			$("#super_HTML").css({"overflow":"auto"});
//		})
    })
}

window.onclick = function(event) {
var htmlTag = document.getElementById('super_HTML');
var modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = "none";
    htmlTag.style.overflow = "auto";
  }
}
