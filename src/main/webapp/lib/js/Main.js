var tempUserNo = 0;
var boardNo = 0;
var boardNo2 = 0;
var comentInfo = 0;

$(document).ready(function(){
	$(function() {
		$("#includedContent").load("/TeamProject/header.html");
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
		$(".tab-content > .category_tab-0").html(template1(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			boardNo = $(this).attr("data-no")
			ajaxLoadBoard(boardNo);
			ajaxPostComentsList(boardNo)
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/ContentsDetail.html?no="+boardNo);
		})
		$(".btn-primary").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/Main.html");
		})
		$(".categoryLink").click(function(event){
			event.stopImmediatePropagation();
			var ctgNo =$(this).attr("data-ctg")
			boardcategoryClick(ctgNo);
		})
		$(".userInfoLink").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + $(this).attr("data-userNick");
		})
		category();
	})
}
function ajaxDetailBoardList() {
	$.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		var detailBoardTemplate2 = Handlebars.compile($('#detailliTemplateText').html())
		$(".tab-content > .category_tab-0").html(detailBoardTemplate2(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			boardNo = $(this).attr("data-no")
			ajaxLoadBoard(boardNo)
			ajaxPostComentsList(boardNo)
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/ContentsDetail.html?no="+boardNo2);
		})
		$(".btn-primary").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/Main.html");
		})
		$(".categoryLink").click(function(event){
			event.stopImmediatePropagation();
			var ctgNo =$(this).attr("data-ctg")
			detailboardcategoryClick(ctgNo);
		})
		$(".userInfoLink").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + $(this).attr("data-userNick");
		})
		categorydetailBoard();
	})
}
function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		var fileList = '';
		checkingFollow(result.data.board.userNo);
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		} else {
			// 기존 영역 초기화 시작
			$("#no").val("");
			comentInfo =result.data.board.no;
			$("#userTitle").text("");
			$("#url").text("");
			$("#userDesc").html("");
			$("#url_location").html("");
			$("#fileListArea").text("");
			$("#linkTitle").text("");
			$("#linkDesc").text("");
			$("#linkURL").text("");
			$("#urlImage").html("");
			$("#fileListArea").html("");
			$("#youtubeUrl").attr("src","");
			// 기존 영역 초기화 완료
			
			
			
			$("#no").val(result.data.board.no);
			comentInfo =result.data.board.no;
			$("#userTitle").text(result.data.board.title);
			$("#url").text(result.data.board.url);
			$("#userImage").attr("src", "/TeamProject/upload/" + result.data.board.userProfilePath);
			$("#userDesc").html(result.data.board.contents);
			$("#createdDate").text(result.data.board.createdDate2);
			$("#writerNick").text(result.data.board.writerNick);
			$("#url_location").html(result.data.board.linkTitle);
			$("#post_user_id").text(result.data.board.email);
			$("#viewCount").text(result.data.board.viewCount);
			$("#like").text(result.data.board.like);
			$("#fileListArea").text(result.data.fileList.originalFileName);
			if (result.data.urlInfo.title != null) {
				$("#linkTitle").text(result.data.urlInfo.title);
				$("#linkDesc").text(result.data.urlInfo.description);
				$("#linkURL").text(result.data.urlInfo.urlAddr);
				$("#urlImage").html(result.data.urlInfo.image);
				$(".linkText").css('display','block');
			} else {
				$(".linkText").css('display','none');
			}
			if (result.data.fileList.length > 0) {
				for (var i = 0; i < result.data.fileList.length; i++) {
					fileList += "<a id='fileListArea'" +"href='http://t2.java85.com:8080/TeamProject/upload/" 
					+ result.data.fileList[i].fileName + "' download='" + result.data.fileList[i].originalFileName + "'>"
					+ (i+1) + "." + result.data.fileList[i].originalFileName + "</div>"
				}
				$("#fileListArea").html(fileList);
				$(".fileArea").css('display','block');
			} else {
				$(".fileArea").css('display','none');
			}
			
			if (result.data.board.youtubeURL != null) {
				$("#youtubeUrl").attr("src","https://www.youtube.com/embed/" + result.data.board.youtubeURL);
				$(".youtubeArea").css('display','block');
			} else if (result.data.board.youtubeURL == null){
				$(".youtubeArea").css('display','none');
			}
			
		}	
		$("#writerNick").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + result.data.board.writerNick;
		})
		$(".owner_img").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + result.data.board.writerNick;
		})
		// 이거 지우지마!!!! 회원번호 팔로우할때 쓸려고 넘기는 코드임!!!!
		tempUserNo = result.data.board.userNo;
//		followLoderFunc(tempUserNo)
		$("#followBtn").on("click", function(){
		$("#followBtn").unbind('click');
		console.log("userNo= " + result.data.board.userNo);
		aJaxFollowUser(result.data.board.userNo)
		
	})
	})
}
var comentInfo2 = 0;
var detailBoardNo = 0;
function ajaxDetailLoadBoard(no) {
	detailBoardNo = no;
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state == "fail" || result.state == "error") {
			alert("조회 실패입니다.")
			return
		} else if (result.state == "success"){
			$("#no2").val(result.data.board.no);
			comentInfo2 =result.data.board.no;
			$("#userTitle2").text(result.data.board.title);
			$("#url2").text(result.data.board.url);
			$("#userDesc2").html(result.data.board.contents);
			$("#createdDate2").text(result.data.board.createdDate2);
			$("#writerNick2").text(result.data.board.writerNick);
			$("#url_location2").html(result.data.board.linkTitle);
			$("#post_user_id2").text(result.data.board.email);
			$("#viewCount2").text(result.data.board.viewCount);
			$("#like2").text(result.data.board.like);
			$("#linkTitle2").text(result.data.urlInfo.title);
			$("#linkDesc2").text(result.data.urlInfo.description);
			$("#linkURL2").text(result.data.urlInfo.urlAddr);
			$("#urlImage2").html(result.data.urlInfo.image);
		} else {
			$("#no2").val(result.data.board.no);
			comentInfo2 =result.data.board.no;
			$("#userTitle2").text(result.data.board.title);
			$("#url2").text(result.data.board.url);
			$("#userDesc2").html(result.data.board.contents);
			$("#createdDate2").text(result.data.board.createdDate2);
			$("#writerNick2").text(result.data.board.writerNick);
			$("#url_location2").html(result.data.board.linkTitle);
			$("#post_user_id2").text(result.data.board.email);
			$("#viewCount2").text(result.data.board.viewCount);
			$("#like2").text(result.data.board.like);
		}
		tempUserNo = result.data.board.userNo;
		followLoderFunc(tempUserNo)
	})
}
$("#insertCmt").click(function(event){
	var honeyComent = {
			coment: $("#pcomment").val(),
			no: comentInfo
	}
	$.ajax({
		url:serverAddr +"/mainpage/insertComent.json",
		type: "POST",
		dataType:"json",
		data: honeyComent,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("로그인 후 사용해 주세요.")
				return
			}
			$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + honeyComent.no, function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					alert("서버에서 데이터를 가져오는데 실패했습니다.")
					return
				}
				var contents = ""
				var arr = result.data.comentList;
				for (var i=0; i < arr.length; i++) {
					if(result.data.LoginInfo == arr[i].memberNo) {
						contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
						"<div class='coment_info'>" +
						"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
						"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
						"<div class='coment_ud'>" +
						"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
						"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
						"<div class='cmt-btn-wrap'>" +
						"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
						"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
						"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
						"<div class='replyArea'></div>" +
						"</div>" + 
						"</div>" + "</div>"
					}
					if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
						contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
						"<div class='coment_info'>" +
						"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
						"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
						"<div class='coment_ud'>" +
						"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
						"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
						"<div class='cmt-btn-wrap'>" +
						"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
						"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
						"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
						"<div class='replyArea'></div>" +
						"</div>" +
						"</div>" + "</div>"
					}
				}
				$(".userComment > .cmts_list").html(contents);
				$("#pcomment").val("");
			})
		}
	})
});
$("#insertCmt2").click(function(event){
	var honeyComent = {
			coment: $("#pcomment2").val(),
			no: comentInfo2
	}
	$.ajax({
		url:serverAddr +"/mainpage/insertComent.json",
		type: "POST",
		dataType:"json",
		data: honeyComent,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("로그인 후 사용해 주세요.")
				return
			}
			$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + detailBoardNo, function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					alert("서버에서 데이터를 가져오는데 실패했습니다.")
					return
				}
				var contents = ""
					var arr = result.data.comentList
					for (var i=0; i < arr.length; i++) {
						if(result.data.LoginInfo == arr[i].memberNo) {
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' data-Delete='" + arr[i].cmtNo + 
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						} 
						if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						}
					}
				$(".userComment > .cmts_list2").html(contents);
				$("#pcomment2").val("");
			})
		}
	})
});
function ajaxPostComentsList(no) {
	$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		var contents = ""
			var arr = result.data.comentList;
		for (var i=0; i < arr.length; i++) {
			if(result.data.LoginInfo == arr[i].memberNo) {
				contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
				"<div class='coment_info'>" +
				"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
				"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
				"<div class='coment_ud'>" +
				"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
				"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
				"<div class='cmt-btn-wrap'>" +
				"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
				"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
				"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
				"<div class='replyArea'></div>" +
				"</div>" + 
				"</div>" + "</div>"
			} 
			if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
				contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
				"<div class='coment_info'>" +
				"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
				"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
				"<div class='coment_ud'>" +
				"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
				"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
				"<div class='cmt-btn-wrap'>" +
				"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
				"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
				"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
				"<div class='replyArea'></div>" +
				"</div>" +
				"</div>" + "</div>"
			}
		}
		$(".userComment > .cmts_list").html(contents);
	})
}
function ajaxDetailPostComentsList(no) {
	$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		var contents2 = ""
			var arr = result.data.comentList
			for (var i=0; i < arr.length; i++) {
				if(result.data.LoginInfo == arr[i].memberNo) {
					contents2 += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
					"<div class='coment_info'>" +
					"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
					"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
					"<div class='coment_ud'>" +
					"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
					"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
					"<div class='cmt-btn-wrap2'>" +
					"<a class='cmt_update2' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
					"<a class='cmt_delete2' type='button' data-Delete='" + arr[i].cmtNo + 
					"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
					"<div class='replyArea2'></div>" +
					"</div>" + 
					"</div>" + "</div>"
				} 
				if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
					contents2 += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
					"<div class='coment_info'>" +
					"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
					"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
					"<div class='coment_ud'>" +
					"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
					"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
					"<div class='cmt-btn-wrap2'>" +
					"<a class='cmt_update2' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
					"<a class='cmt_delete2' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
					"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
					"<div class='replyArea2'></div>" +
					"</div>" + 
					"</div>" + "</div>"
				}
			}
		$(".userComment > .cmts_list2").html(contents2);
	})
}
var childcomentThread = 0;
$(document.body).on("click",".cmt_reply",function(event) {
	childcomentThread = $(this).attr("data-no");
	$(".coment_wrap[data-cmtNo=" + childcomentThread + "]").find(".replyArea").html(
			"<form class='userComment' method='post' action='#'>" +
			"<textarea placeholder='Add a comment...' maxlength='255'" +
			"id='ccomment'></textarea>" +
			"<span type='button' class='reply-save-btn' >저장</span>" +
			"<span type='button' class='bit-cancel-btn' >취소</span>"
	);
})
var childcomentThread2 = 0;
$(document.body).on("click",".cmt_reply2",function(event) {
	childcomentThread2 = $(this).attr("data-no");
	$(".coment_wrap2[data-cmtNo=" + childcomentThread2 + "]").find(".replyArea2").html(
			"<form class='userComment2' method='post' action='#'>" +
			"<textarea placeholder='Add a comment...' maxlength='255'" +
			"id='ccomment2'></textarea>" +
			"<span type='button' class='reply-save-btn2' >저장</span>" +
			"<span type='button' class='bit-cancel-btn' >취소</span>"
	);
})
$(document.body).on("click",".reply-save-btn",function(event){
	var honeyComent = {
			cmtNo: childcomentThread,
			coment: $("#ccomment").val(),
			no: comentInfo
	}
	$.ajax({
		url:serverAddr +"/mainpage/insertChildComent.json",
		type: "POST",
		dataType:"json",
		data: honeyComent,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("로그인 후 사용해 주세요.")
				return
			}
			$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + honeyComent.no, function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					alert("서버에서 데이터를 가져오는데 실패했습니다.")
					return
				}
				var contents = ""
					var arr = result.data.comentList;
				for (var i=0; i < arr.length; i++) {
					if(result.data.LoginInfo == arr[i].memberNo) {
						contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
						"<div class='coment_info'>" +
						"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
						"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
						"<div class='coment_ud'>" +
						"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
						"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
						"<div class='cmt-btn-wrap'>" +
						"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
						"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
						"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
						"<div class='replyArea'></div>" +
						"</div>" + 
						"</div>" + "</div>"
					} 
					if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
						contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
						"<div class='coment_info'>" +
						"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
						"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
						"<div class='coment_ud'>" +
						"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
						"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
						"<div class='cmt-btn-wrap'>" +
						"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
						"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
						"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
						"<div class='replyArea'></div>" +
						"</div>" +
						"</div>" + "</div>"
					}
				}
				$(".userComment > .cmts_list").html(contents);
			})
		}
	})
});
$(document.body).on("click",".reply-save-btn2",function(event){
	var honeyComent = {
			cmtNo: childcomentThread2,
			coment: $("#ccomment2").val(),
			no: comentInfo2
	}
	$.ajax({
		url:serverAddr +"/mainpage/insertChildComent.json",
		type: "POST",
		dataType:"json",
		data: honeyComent,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("로그인 후 사용해 주세요.")
				return
			}
			$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + honeyComent.no, function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					alert("서버에서 데이터를 가져오는데 실패했습니다.")
					return
				}
				var contents = ""
					var arr = result.data.comentList
					for (var i=0; i < arr.length; i++) {
						if(result.data.LoginInfo == arr[i].memberNo) {
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' data-Delete='" + arr[i].cmtNo + 
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						} 
						if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						}
					}
				$(".userComment > .cmts_list2").html(contents);
			})
		}
	})
});
function ajaxComentDetail(no) {
	$.getJSON(serverAddr + "/mainpage/comentDetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult      
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		} 
		else {
			$(".coment_wrap[data-cmtNo=" + no + "]").find(".cmt_conts").html(
			"<textarea type='text' class='update-contents reUpdateLimit'></textarea>");
			$(".coment_wrap[data-cmtNo=" + no + "]").find(".cmt-btn-wrap").html(
					"<button type='button' class='bit-save-btn' data-no=" + no + ">저장</button>" +
					"<button type='button' class='bit-cancel-btn' data-no=" + no + ">취소</button>");
			$(".coment_wrap[data-cmtNo=" + no + "]").find(".update-contents").val(result.data.coment);
		}
	})
}
function ajaxDetailPageComentDetail(no) {
	$.getJSON(serverAddr + "/mainpage/comentDetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult      
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		} 
		else {
			$(".coment_wrap2[data-cmtNo=" + no + "]").find(".cmt_conts").html(
			"<textarea type='text' class='update-contents2 reUpdateLimit'></textarea>");
			$(".coment_wrap2[data-cmtNo=" + no + "]").find(".cmt-btn-wrap2").html(
					"<button type='button' class='bit-save-btn2' data-no=" + no + ">저장</button>" +
					"<button type='button' class='bit-cancel-btn' data-no=" + no + ">취소</button>");
			$(".coment_wrap2[data-cmtNo=" + no + "]").find(".update-contents2").val(result.data.coment);
		}
	})
}
$(document.body).on("click",".cmt_update",function(event) {
	var cno = $(this).attr("data-update");
	ajaxComentDetail(cno)
});
$(document.body).on("click",".cmt_update2",function(event) {
	var cno = $(this).attr("data-update");
	ajaxDetailPageComentDetail(cno)
});
$(document.body).on("click",".bit-save-btn",function(event) {
	var honeyComent = {
			cmtNo: $(this).attr("data-no"),
			coment: $(".update-contents").val()
	}
	if (confirm("정말 변경하시겠습니까?") == true) {
		$.ajax({
			url:serverAddr +"/mainpage/updateComment.json",
			type: "POST",
			dataType:"json",
			data: honeyComent,
			success: function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					return
				}
				$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + boardNo, function(obj) {
					var result = obj.jsonResult
					if (result.state != "success") {
						alert("서버에서 데이터를 가져오는데 실패했습니다.")
						return
					}
					var contents = ""
						var arr = result.data.comentList;
					for (var i=0; i < arr.length; i++) {
						if(result.data.LoginInfo == arr[i].memberNo) {
							contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap'>" +
							"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						} 
						if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
							contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap'>" +
							"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea'></div>" +
							"</div>" +
							"</div>" + "</div>"
						}
					}
					$(".userComment > .cmts_list").html(contents);
				})
			}
		})
	} else {
		return;
	}
});
$(document.body).on("click",".bit-save-btn2",function(event) {
	var honeyComent = {
			cmtNo: $(this).attr("data-no"),
			coment: $(".update-contents2").val()
	}
	if (confirm("정말 변경하시겠습니까?") == true) {
		$.ajax({
			url:serverAddr +"/mainpage/updateComment.json",
			type: "POST",
			dataType:"json",
			data: honeyComent,
			success: function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					return
				}
				$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + detailBoardNo, function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					alert("서버에서 데이터를 가져오는데 실패했습니다.")
					return
				}
				var contents = ""
					var arr = result.data.comentList
					for (var i=0; i < arr.length; i++) {
						if(result.data.LoginInfo == arr[i].memberNo) {
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' data-Delete='" + arr[i].cmtNo + 
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						} 
						if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						}
					}
				$(".userComment > .cmts_list2").html(contents);
			})
			}
		})
	} else {
		return;
	}
});
$(document.body).on("click",".cmt_delete",function(event) {
	var depth = $(this).attr("data-depth")
	var no = $(this).attr("data-Delete");
	if(depth == 0) {
		if (confirm("정말 삭제하시겠습니까?") == true) {
			$.ajax({
				url:serverAddr +"/mainpage/delete.json",
				type: "GET",
				dataType:"json",
				data: {no: no},
				success: function(obj) {
					var result = obj.jsonResult
					if (result.state != "success") {
						alert("삭제 실패입니다.")
						return
					}
					$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + boardNo, function(obj) {
						var result = obj.jsonResult
						if (result.state != "success") {
							alert("서버에서 데이터를 가져오는데 실패했습니다.")
							return
						}
						var contents = ""
							var arr = result.data.comentList;
						for (var i=0; i < arr.length; i++) {
							if(result.data.LoginInfo == arr[i].memberNo) {
								contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
								"<div class='coment_info'>" +
								"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
								"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
								"<div class='coment_ud'>" +
								"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
								"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
								"<div class='cmt-btn-wrap'>" +
								"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
								"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
								"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
								"<div class='replyArea'></div>" +
								"</div>" + 
								"</div>" + "</div>"
							} 
							if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
								contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
								"<div class='coment_info'>" +
								"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
								"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
								"<div class='coment_ud'>" +
								"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
								"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
								"<div class='cmt-btn-wrap'>" +
								"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
								"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
								"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
								"<div class='replyArea'></div>" +
								"</div>" +
								"</div>" + "</div>"
							}
						}
						$(".userComment > .cmts_list").html(contents);
					})
				}
			})
		} else {
			return;
		}
	} 
	if(depth == 1){
		if (confirm("정말 삭제하시겠습니까?") == true) {
			$.ajax({
				url:serverAddr +"/mainpage/childdelete.json",
				type: "GET",
				dataType:"json",
				data: {no: no},
				success: function(obj) {
					var result = obj.jsonResult
					if (result.state != "success") {
						alert("삭제 실패입니다.")
						return
					}
					$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + boardNo, function(obj) {
						var result = obj.jsonResult
						if (result.state != "success") {
							alert("서버에서 데이터를 가져오는데 실패했습니다.")
							return
						}
						var contents = ""
							var arr = result.data.comentList;
						for (var i=0; i < arr.length; i++) {
							if(result.data.LoginInfo == arr[i].memberNo) {
								contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
								"<div class='coment_info'>" +
								"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
								"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
								"<div class='coment_ud'>" +
								"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
								"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
								"<div class='cmt-btn-wrap'>" +
								"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
								"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
								"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
								"<div class='replyArea'></div>" +
								"</div>" + 
								"</div>" + "</div>"
							} 
							if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
								contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
								"<div class='coment_info'>" +
								"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
								"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
								"<div class='coment_ud'>" +
								"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
								"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
								"<div class='cmt-btn-wrap'>" +
								"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
								"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
								"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
								"<div class='replyArea'></div>" +
								"</div>" +
								"</div>" + "</div>"
							}
						}
						$(".userComment > .cmts_list").html(contents);
					})
				}
			})
		} else {
			return;
		}
	}
});
$(document.body).on("click",".cmt_delete2",function(event) {
	var depth = $(this).attr("data-depth")
	var no = $(this).attr("data-Delete");
	if(depth == 0) {
		if (confirm("정말 삭제하시겠습니까?") == true) {
			$.ajax({
				url:serverAddr +"/mainpage/delete.json",
				type: "GET",
				dataType:"json",
				data: {no: no},
				success: function(obj) {
					var result = obj.jsonResult
					if (result.state != "success") {
						alert("삭제 실패입니다.")
						return
					}
					$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + detailBoardNo, function(obj) {
				var result = obj.jsonResult
				if (result.state != "success") {
					alert("서버에서 데이터를 가져오는데 실패했습니다.")
					return
				}
				var contents = ""
					var arr = result.data.comentList
					for (var i=0; i < arr.length; i++) {
						if(result.data.LoginInfo == arr[i].memberNo) {
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' data-Delete='" + arr[i].cmtNo + 
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						} 
						if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
							contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
							"<div class='coment_info'>" +
							"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
							"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
							"<div class='coment_ud'>" +
							"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
							"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
							"<div class='cmt-btn-wrap2'>" +
							"<a class='cmt_update2' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
							"<a class='cmt_delete2' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
							"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
							"<div class='replyArea2'></div>" +
							"</div>" + 
							"</div>" + "</div>"
						}
					}
				$(".userComment > .cmts_list2").html(contents);
			})
				}
			})
		} else {
			return;
		}
	} 
	if(depth == 1){
		if (confirm("정말 삭제하시겠습니까?") == true) {
			$.ajax({
				url:serverAddr +"/mainpage/childdelete.json",
				type: "GET",
				dataType:"json",
				data: {no: no},
				success: function(obj) {
					var result = obj.jsonResult
					if (result.state != "success") {
						alert("삭제 실패입니다.")
						return
					}
					$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + detailBoardNo, function(obj) {
						var result = obj.jsonResult
						if (result.state != "success") {
							alert("서버에서 데이터를 가져오는데 실패했습니다.")
							return
						}
						var contents = ""
							var arr = result.data.comentList
							for (var i=0; i < arr.length; i++) {
								if(result.data.LoginInfo == arr[i].memberNo) {
									contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
									"<div class='coment_info'>" +
									"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
									"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
									"<div class='coment_ud'>" +
									"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
									"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
									"<div class='cmt-btn-wrap2'>" +
									"<a class='cmt_update2' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
									"<a class='cmt_delete2' type='button' data-Delete='" + arr[i].cmtNo + 
									"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
									"<div class='replyArea2'></div>" +
									"</div>" + 
									"</div>" + "</div>"
								} 
								if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
									contents += "<div class='coment_wrap2' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
									"<div class='coment_info'>" +
									"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
									"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
									"<div class='coment_ud'>" +
									"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
									"<a class='cmt_reply2' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
									"<div class='cmt-btn-wrap2'>" +
									"<a class='cmt_update2' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
									"<a class='cmt_delete2' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
									"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
									"<div class='replyArea2'></div>" +
									"</div>" + 
									"</div>" + "</div>"
								}
							}
						$(".userComment > .cmts_list2").html(contents);
					})
				}
			})
		} else {
			return;
		}
	}
});
window.onclick = function(event) {
	
	var htmlTag = document.getElementById('super_HTML');
	var modal = document.getElementById('yourModal');
	if (event.target == modal) {
		modal.style.display = "none";
		htmlTag.style.overflow = "auto";
		window.history.pushState("Changed URI", "", "/TeamProject/mainpage/Main.html");
	}
}
