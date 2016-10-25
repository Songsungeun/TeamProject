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
		$(".tabs-1-contents").html(template1(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
			ajaxPostComentsList(no)
		})
		$("#btn-primary-Btn").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
		})
		$(".categoryLink").click(function(event){
			var ctgNo =$(this).attr("data-ctgNo")
			console.log(ctgNo)
		})
		$(".userInfoLink").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + $(this).attr("data-userNick");
		})
//		$("#yourModal").click(function() {
//		$("#yourModal").css({"display":"none"});
//		$("#super_HTML").css({"overflow":"auto"});
//		})
	})
}

var comentInfo = 0;
function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#no").val(result.data.board.no);
		comentInfo =result.data.board.no;
		$("#userTitle").text(result.data.board.title);
		$("#url").text(result.data.board.url);
		$("#userDesc").text(result.data.board.contents);
		$("#createdDate").text(result.data.board.createdDate2);
		$("#writerNick").text(result.data.board.writerNick);
		$("#url_location").html(result.data.board.linkTitle);
		$("#post_user_id").text(result.data.board.email);
		$("#viewCount").text(result.data.board.viewCount);
		$("#like").text(result.data.board.like);
		$("#linkTitle").text(result.data.urlInfo.title);
		$("#linkDesc").text(result.data.urlInfo.description);
		$("#linkURL").text(result.data.urlInfo.urlAddr);
		$("#urlImage").html(result.data.urlInfo.image);
//		$(".post_url > #url").click(function(event) {
//		console.log("url 눌림");
//		console.log(result.data.url);
//		location.href = result.data.url;
//		window.open(result.data.url);
//		})
	})
	$("#insertCmt").click(function(event){
		var honeyComent = {
				coment: $("#pcomment").val(),
				no: comentInfo
		}
		console.log(honeyComent);
		ajaxAddComent(honeyComent);
		console.log("addComentBtn 누름")
	});


	function ajaxAddComent(honeyComent) {
		$.post(serverAddr + "/mainpage/insertComent.json", honeyComent, function(obj) {
			var result = obj.jsonResult
			console.log(result);
			if (result.state != "success") {
				alert("등록 실패입니다.")
				return
			}
		}, "json")
		location.reload(true);

	}
}

function ajaxPostComentsList(no) {
	$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		var contents = ""
			var arr = result.data.comentList
			for (var i=0; i < arr.length; i++) {
				if(result.data.LoginInfo == arr[i].memberNo) {
					contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
					"<div class='coment_info'>" +
					"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
					"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" +
//					"<textarea class='cmt_conts' id='cmt_area' data-cmtarea='"+ arr[i].cmtNo +"'style='display:none'>" + arr[i].coment + "</textarea>" +
					"</div>" +
					"<div class='coment_ud'>" +
					"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
					"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
					"<div class='cmt-btn-wrap'>" +
					"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
					"<a class='cmt_delete' type='button' data-update='" + arr[i].cmtNo + "'>삭제</a>" +
					"</div>" +
					"</div>" +
					"</div>"
				} 
				if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == null){
					contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "'>" +
					"<div class='coment_info'>" +
					"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
					"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" +
//					"<textarea class='cmt_conts' id='cmt_area' data-cmtarea='"+ arr[i].cmtNo +"' style='display:none'>" + arr[i].coment + "</textarea>" +
					"</div>" +
					"<div class='coment_ud'>" +
					"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
					"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
					"<div class='cmt-btn-wrap'>" +
					"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
					"<a class='cmt_delete' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>삭제</a>" +
					"</div>" +
					"</div>" +
					"</div>"
				}
			}
		$(".userComment > .cmts_list").html(contents);
		console.log(result.data.LoginInfo)
	})
}


$(document.body).on("click",".cmt_update",function(event) {
	var cno = $(this).attr("data-update")
	ajaxComentDetail(cno)
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

$(document.body).on("click",".bit-save-btn",function(event) {
	var honeyComent = {
			cmtNo: $(this).attr("data-no"),
			coment: $(".update-contents").val()
	}
	if (confirm("정말 변경하시겠습니까?") == true) {
		console.log(honeyComent.cmtNo)
		ajaxUpdateComent(honeyComent)
	} else {
		return;
	}
});

function ajaxUpdateComent(honeyComent) {
	$.post(serverAddr + "/mainpage/updateComment.json", honeyComent, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		location.reload();
	}, "json")
}


window.onclick = function(event) {
	var htmlTag = document.getElementById('super_HTML');
	var modal = document.getElementById('yourModal');
	if (event.target == modal) {
		modal.style.display = "none";
		htmlTag.style.overflow = "auto";
	}


}
