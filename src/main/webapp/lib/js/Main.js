$(document).ready(function(){
	$(function() {
		$("#includedContent").load("/TestProject/header.html");
	});
});

function ajaxBoardList() {
	$.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		var template1 = Handlebars.compile($('#liTemplateText').html())
		$(".tabs-1-contents").html(template1(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
			ajaxPostPTComentsList(no)
		})
		$("#btn-primary-Btn").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
		})
//		$("#yourModal").click(function() {
//			$("#yourModal").css({"display":"none"});
//			$("#super_HTML").css({"overflow":"auto"});
//		})
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
//		$(".post_url > #url").click(function(event) {
//				console.log("url 눌림");
//				console.log(result.data.url);
//				location.href = result.data.url;
//				window.open(result.data.url);
//		})
	})
}
function ajaxPostPTComentsList(no) {
	$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	return
	    }
		var contents = ""
	    var arr = result.data
	      for (var i in arr) {
	    	contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "'>" +
	    	  "<div class='coment_info'>" +
	            "<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
	            "<span class='cmt_conts'>" + arr[i].coment + "</span>" +
	          "</div>" +
	          "<div class='coment_ud'>" +
	    	    "<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
	    	    "<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
	            "<a class='cmt_update' style='display: none;'>수정</a>" +
	            "<a class='cmt_delete' style='display: none;'>삭제</a>" +
	          "</div>" +
	        "</div>"
	      }
	    $(".post_cmt_list > .cmts_list").html(contents);

//	    $(".reply_wrap").html(contents2);
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
//$("#addComentBtn").click(function(event){
//	var honeyComent = {
//			boardNo:  $("#no").val(),
//			memberNo: $(cmt_userNick).attr("data-no"),
//			coment: $("#inputComent").val()
//	}
//	ajaxAddComent(honeyComent);
//	console.log("addComentBtn 누름")
//});
//function ajaxAddComent(honeyComent) {
//	$.post(serverAddr + "/mainpage/addComent.json", honeyComent, function(obj) {
//		var result = obj.jsonResult
//		if (result.state != "success") {
//	    	 alert("등록 실패입니다.")
//	    	 return
//	    }
//	}, "json")
//}
//function ajaxPostCHComentsList(no) {
//	$.getJSON(serverAddr + "/mainpage/childCmtList.json?no=" + no, function(obj) {
//		var result = obj.jsonResult
//		if (result.state != "success") {
//	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
//	    	 return
//	    }
//		console.log()
//		var contents = ""
//	    var arr = result.data
//	    if(arr[i].cmtNo == arr[i].comentThread) {
//	    if (arr[i].comentDepth != 0) {
//	      for (var i in arr) {
//	    	contents += "<div class='coment_replyArea'>" +
//              "<div class='reply_coment_info'>" +
//	              "<a class='reply_cmt_userNick' href='#' data-no='" + arr[i].userNo + "'>" + arr[i].writerNick + "</a>" +
//                "<span class='reply_cmt_conts'>" + arr[i].childComent + "</span>" +
//              "</div>" +
//              "<div class='reply_coment_ud'>" +
//	            "<span class='reply_cmt_createdDate'>" + arr[i].comentCreatedDate + "</span>" +
//	            "<a class='cmt_reply' href='#' data-no='" + arr[i].chileComentNo + "'>답글달기</a>" +
//                "<a class='reply_cmt_update' style='display: none;'>수정</a>" +
//                "<a class='reply_cmt_delete' style='display: none;'>삭제</a>" +
//              "</div>" +
//            "</div>"
//	      }
//	    }
//	    }
//	    $(".coment_wrap > .reply_wrap").html(contents);
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
//    })
//}

window.onclick = function(event) {
var htmlTag = document.getElementById('super_HTML');
var modal = document.getElementById('yourModal');
  if (event.target == modal) {
    modal.style.display = "none";
    htmlTag.style.overflow = "auto";
  }
}
