var tempUserNo = 0;
var boardNo = 0;
var comentInfo = 0;
var detailBoardNo = 0;
$(document).ready(function(){
	$(function() {
		$("#includedContent").load("../header.html");
	});
}); 
function ajaxBoardList() {
	$.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		var template1 = Handlebars.compile($('#li1TemplateText').html())
		$(".tab-content > .allConts1").html(template1(result));
		var template2 = Handlebars.compile($('#li2TemplateText').html())
		$(".tab-content > .allConts2").html(template2(result));
		var template3 = Handlebars.compile($('#li3TemplateText').html())
		$(".tab-content > .allConts3").html(template3(result));
		var template4 = Handlebars.compile($('#li4TemplateText').html())
		$(".tab-content > .allConts4").html(template4(result));

		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			boardNo = $(this).attr("data-no")
			ajaxLoadBoard(boardNo);
			ajaxPostComentsList(boardNo);
			window.history.pushState("Changed URI", "", "../mainpage/ContentsDetail.html?no="+boardNo);
		})
		$(".btn-primary").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
			window.history.pushState("Changed URI", "", "../mainpage/Main.html");
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
function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		var fileList = '';
		checkingFollow(result.data.board.userNo);
		checkingLike(result.data.board.no);
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
				$("#linkTitle").attr("href",result.data.urlInfo.detailUrl);
				$("#linkDesc").text(result.data.urlInfo.description);
				$("#linkDesc").attr("href",result.data.urlInfo.detailUrl);
				$("#linkURL").text(result.data.urlInfo.urlAddr);
				$("#linkURL").attr("href",result.data.urlInfo.detailUrl);
				$("#urlImage").html(result.data.urlInfo.image);
				$("#urlImage").attr("href", result.data.urlInfo.detailUrl);
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
		$("#followBtn").unbind('click');
		$("#followBtn").on("click", function(){
			aJaxFollowUser(result.data.board.userNo)
		})
		$("#likeBtn").unbind('click');
		$("#likeBtn").on("click", function(){
			aJaxLikeBoard(result.data.board.no)
		})
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
			var no = honeyComent.no;
			ajaxPostComentsList(no);
			$("#pcomment").val("");
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
				"<div class='cmt-leftside'><img id='cmt_userPhoto' src='../upload/"+arr[i].commentMemberPhoto+"'></div>" +
				"<div class='cmt-rightside'>" + "<div class='coment_info'>" +
				"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
				"<div class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</div>" + "</div>" +
				"<div class='coment_ud'>" +
				"<div id='cmt-btn-wrap-left'><span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
				"<span class='cmt_reply_"+arr[i].comentDepth + "' href='#' data-no='" + arr[i].cmtNo + "'>답글 달기</span></div>" +
				"<div id='cmt-btn-wrap-right'>" +
				"<span class='cmt_update' method='post' data-update='" + arr[i].cmtNo + "' data-depth='"+arr[i].comentDepth+"'>수정</span>" +
				"<span class='cmt_delete' method='post' data-Delete='" + arr[i].cmtNo + "' data-depth='" + arr[i].comentDepth + "'>삭제</span>" +
				"</div>" + 
				"<div class='replyArea'></div>" +
				"</div>" + "</div>" + "</div>"
			} 
			if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
				contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
				"<img id='cmt_userPhoto' class='cmt-leftside' src='../upload/"+arr[i].commentMemberPhoto+"'>" +
				"<div class='cmt-rightside'>" + "<div class='coment_info'>" +
				"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
				"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
				"<div class='coment_ud'>" +
				"<div id='cmt-btn-wrap-left'><span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
				"<span class='cmt_reply_" + arr[i].comentDepth + "' href='#' data-no='" + arr[i].cmtNo + "'>답글 달기</span></div>" +
				"<div id='cmt-btn-wrap-right'>" +
				"<span class='cmt_update' method='post' style='display:none' data-update='" + arr[i].cmtNo + "' data-depth='"+arr[i].comentDepth+"'>수정</span>" +
				"<span class='cmt_delete' method='post' style='display:none' data-Delete='" + arr[i].cmtNo + "' data-depth='" + arr[i].comentDepth + "'>삭제</span>" +
				"</div>" +
				"<div class='replyArea'></div>" +
				"</div>" + "</div>" + "</div>"
			}
		}
		$(".userComment > .cmts_list").html(contents);
	})
}
var childcomentThread = 0;
$(document.body).on("click",".cmt_reply_0",function(event) {
	childcomentThread = $(this).attr("data-no");
	$(".coment_wrap[data-cmtNo=" + childcomentThread + "]").find(".replyArea").html(
			"<textarea placeholder='댓글을 입력 하세요.' maxlength='255'" +
			"id='ccomment'></textarea>" +
			"<div id='replyBtnWrap'>" +
			"<span method='post' class='reply-save-btn' data-no='"+childcomentThread+"'>댓글 달기</span>" +
			"<span method='post' class='bit-cancel-btn replycancelBtn' data-no='"+childcomentThread+"'>취소</span></div>"
	);
})
$(document.body).on("click",".bit-cancel-btn",function(event) {
    ajaxPostComentsList(comentInfo);
});
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
			var no = honeyComent.no;
			ajaxPostComentsList(no);
		}
	})
});
var updateNo = 0;
$(document.body).on("click",".cmt_update",function(event) {
	var cno = $(this).attr("data-update");
	updateNo = $(this).attr("data-depth");
	ajaxComentDetail(cno)
});
function ajaxComentDetail(no) {
	var upNo = updateNo;
	console.log(upNo);
	$.getJSON(serverAddr + "/mainpage/comentDetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		} 
		else {
			$(".coment_wrap[data-cmtNo=" + no + "]").find(".cmt_conts").html(
			"<textarea type='text' class='update-contents reUpdateLimit updateDepthNo"+updateNo+"'></textarea>");
			$(".coment_wrap[data-cmtNo=" + no + "]").find("#cmt-btn-wrap-right").html(
					"<span method='post' class='bit-save-btn' data-no=" + no + ">저장</span>" +
					"<span method='post' class='bit-cancel-btn updatecancelBtn' data-no=" + no + ">취소</span>");
			$(".coment_wrap[data-cmtNo=" + no + "]").find(".update-contents").val(result.data.coment);
		}
	})
}
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
				var no = boardNo;
				ajaxPostComentsList(no);
			}
		})
	} else {
		return;
	}
});
$(document.body).on("click",".cmt_delete",function(event) {
	var depth = $(this).attr("data-depth")
	var no = $(this).attr("data-Delete");
	console.log("deleteNo: " + no)
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
					var no = boardNo;
					ajaxPostComentsList(no);
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
					var no = boardNo;
					ajaxPostComentsList(no);
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
		window.history.pushState("Changed URI", "", "../mainpage/Main.html");
	}
}
