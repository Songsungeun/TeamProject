var admin = { 
		pageNo :1,
		pageLength : 6,
		stateResultCode1 : 1,
		stateResultCode2 : 0,
		adminList : "/admin/adminPostlist.json",
		likeList :  "/admin/adminLikeList.json",
	    adminPostResult :"/admin/adminPostSearch.json"
}
var ajaxUrl = admin.adminList;
var stateResultCode = admin.stateResultCode1
$(document.body).on('click', '.moreViewBtn', function(event){
	admin.pageLength += 6;
	ajaxAdminBoardList()
})





$(document.body).on('click', '#postBtn',  function(event) {
	var rNumber = $(this).attr("data-no")
	var result = confirm("게시물을 삭제하시겠습니까?\n삭제한 게시물은 복구 불가능합니다.");
	if(result  == true) {
		// 확인 버튼 누를시 
		ajaxDeleteBoard(rNumber)
	} else {
		//취소 버튼 누를시 
	}
});
$(document.body).on('click', '#likeBtn',  function(event) {
	var rNumber = $(this).attr("data-no")
	var result = confirm("좋아요가 취소되요..! 계속 하실껀가요?");
	if(result == true) {
		// 확인 버튼 누를시 
		ajaxLikeDisconnect2(rNumber)
	} else {
		//취소 버튼 누를시 
	}
});
$("#myPostsSwitch").click(function() {
	window.location.reload();
})
$("#likePostSwitch").click(function() {
	$('.conterDetailBtn1').show();
	$('.conterDetailBtn2').show();  
	$("#myPosts").css("color", "#999999")
	$("#followlist").css("color", "#999999")
	$("#likePosts").css("color", "#db2626")
	$("#followList").hide();
	$("#tableWrap").hide();

	ajaxUrl= admin.likeList;
	stateResultCode = admin.stateResultCode2;
	ajaxAdminBoardList(ajaxUrl , stateResultCode)
	$('#cardWrap').show();  
})
$(".conterDetailBtn1").click(function () {
	if($("#tableWrap").css("display") != "none"){   
		$("#layoutBtn").attr("src", "./images/layout-2.svg")
		$("#listBtn").attr("src", "./images/list-1.svg")
		$('#tableWrap').hide();
		$('#cardWrap').show();  
	}
});
$(".conterDetailBtn2").click(function () {
	$("#layoutBtn").attr("src", "./images/layout-1.svg")
	$("#listBtn").attr("src", "./images/list-2.svg")
	$('#cardWrap').hide();  
	$('#tableWrap').show();  
});
$("#followSwitch").click(function () {
	$("#myPosts").css("color", "#999999")
	$("#likePosts").css("color", "#999999")
	$("#followlist").css("color", "#db2626")
	$('#tableWrap').hide();
	$('#cardWrap').hide();  
	$('.conterDetailBtn1').hide();
	$('.conterDetailBtn2').hide();  
	$("#followList").show();
	$.getJSON(serverAddr + "/admin/adminFollowingList.json", 
			function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패하였습니다.")
			return
		}
		var temp = $(this).attr("data-nickName");
		var source = $('#guiderInfoTemplate').html();
		var template = Handlebars.compile(source);
		var data = result.data
		var boards = template(data);
		$("#followList").html(boards);

		$(".userProfilePhoto").click(function(event) {
			location.href = "/TeamProject/membership/otherUserDetailPage.html?nick=" +  $(this).attr("data-nickName");
		})

		$(".userID").click(function(event) {
			location.href = "/TeamProject/membership/otherUserDetailPage.html?nick=" +  $(this).attr("data-nickName");
		})
	})
})
var adminBoardNo = 0;
function ajaxAdminBoardList() {
	$.getJSON(serverAddr + ajaxUrl , {
		"pageNo" : admin.pageNo,
		"length" : admin.pageLength,
		"stateResultCode" : stateResultCode,
	},  function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패하였습니다.")
			return
		}
		var data = result.data
		var resultCode = data.stateResultCode;
		var boardUiTemplate = Handlebars.compile($('#boardUiTemplateText').html())
		var boardUiTemplate2 = Handlebars.compile($('#boardUiTemplateText2').html())
		var cardUiTemplate = Handlebars.compile($('#cardUiTemplateText').html())
		
		
		    if (data.listLength <  data.totalPage) {
		    	console.log("222")
				$("#cardBtn").css("display","none")
				$("#boardBtn").css("display","none")
			} 
		
		
		$("#postsCard").html(cardUiTemplate(data));
		if (resultCode == 1) {
			$("#boardTable").html(boardUiTemplate(data));
		} else {
			$("#boardTable").html(boardUiTemplate2(data));
		}
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$('#yourModal').on('hidden.bs.modal', function (e) {
				  //동영상 정지 메서드호출
				$("#youtubeUrl").attr("src","");
			})
			
			$("html").css({"overflow":"hidden"});
			adminBoardNo = $(this).attr("data-no")
			ajaxAdminLoadBoard(adminBoardNo)
			ajaxAdminPostComentsList(adminBoardNo)
		})
		
		
		
		if (data.list.length >=  data.totalPage) {
			$('.moreViewBtn').css("display", "none")
		} 
		$(document.body).on('click', '.modifyBtn',  function(event) {
			window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
		});
	})
}


$("#testBtn").click(function(){
	var searchValue = $("#testInput").val()
	var stateResultCode = admin.stateResultCode1
	ajaxAdminBoardSearch(searchValue, stateResultCode)
})

function adminPostsSearch(){
	var searchValue = $("#testInput").val()
	var stateResultCode = admin.stateResultCode1
	ajaxAdminBoardSearch(searchValue, stateResultCode)
}

function ajaxAdminBoardSearch(searchValue , stateResultCode) {
	$.getJSON(serverAddr + "/admin/adminPostSearch.json", {
		"searchValue":searchValue,
		"stateResultCode":stateResultCode,
		}, function(obj) {
			var result = obj.jsonResult
			if(result.state != "success") {
				alert("조회 실패입니다.")
				return
			}
			var data = result.data
			var resultCode = data.stateResultCode;
			
			var boardUiTemplate = Handlebars.compile($('#boardUiTemplateText').html())
			var boardUiTemplate2 = Handlebars.compile($('#boardUiTemplateText2').html())
			var cardUiTemplate = Handlebars.compile($('#cardUiTemplateText').html())
			
			$("#postsCard").html(cardUiTemplate(data));
			if (resultCode == 1) {
				$("#boardTable").html(boardUiTemplate(data));
			} else {
				$("#boardTable").html(boardUiTemplate2(data));
			}
			$(".titleLink").click(function(event){
				$("#yourModal").modal();
				$('#yourModal').on('hidden.bs.modal', function (e) {
					  //동영상 정지 메서드호출
					$("#youtubeUrl").attr("src","");
				})
				$("html").css({"overflow":"hidden"});
				adminBoardNo = $(this).attr("data-no")
				ajaxAdminLoadBoard(adminBoardNo)
				ajaxAdminPostComentsList(adminBoardNo)
			})
			
		
			
			
			$(document.body).on('click', '.modifyBtn',  function(event) {
				window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
			});
	})
}

function ajaxDeleteBoard(no) {
	$.getJSON(serverAddr + "/admin/admindelete.json", {
		no: no}, function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("삭제 실패입니다.")
				return
			}
			alert("삭제되었습니다.")
			ajaxAdminBoardList()
			return
		})
}
function ajaxLikeDisconnect2(no) {
	$.ajax({
		url:serverAddr +"/mainpage/likeDisconnect.json",
		type: "POST",
		dataType:"json",
		data: {no:no},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				ajaxAdminBoardList() 
			}
		}
	})
}
var comentInfo = 0;
function ajaxAdminLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		var fileList = '';
		if (result.state == "fail" || result.state == "error") {
			alert("조회 실패입니다.")
			return
		} else if (result.state == "success"){
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
			$("#userImage").attr("src", result.data.board.userProfilePath);
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
			window.location.href = "../../UserStorageAdminPage.html"
		})
		$(".owner_img").click(function(event) {
			window.location.href = "../../UserStorageAdminPage.html"
		})
	})
}
function ajaxAdminPostComentsList(no) {
	$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		var contents = ""
		var arr = result.data.comentList;
		console.log("result.data.LoginInfo= "+result.data.LoginInfo)
		for (var i=0; i < arr.length; i++) {
//			var userPhoto = arr[i].commentMemberPhoto;
//			var userPhotoSplit = userPhoto.split(".");
//			if(userPhotoSplit.length == 2) {
//				commentMemberPhotoPath = "/TeamProject/upload/"+userPhotoSplit[0]+"."+userPhotoSplit[1];
//			} else {
//				commentMemberPhotoPath = "http://graph.facebook.com/"+userPhotoSplit[0]+"/picture";
//				
//			}
			if(result.data.LoginInfo == arr[i].memberNo) {
				contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
				"<div class='cmt-leftside'><img id='cmt_userPhoto' src='"+arr[i].commentMemberPhoto+"'></div>" +
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
				"<div class='cmt-leftside'><img id='cmt_userPhoto' src='"+arr[i].commentMemberPhoto+"'></div>" +
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
				var no = adminBoardNo;
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
					var no = adminBoardNo;
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
					var no = adminBoardNo;
					ajaxPostComentsList(no);
				}
			})
		} else {
			return;
		}
	}
});

 window.onclick = function(event) {
	var adminhtmlTag = document.getElementById('super_HTML_Admin');
	var adminmodal = document.getElementById('yourModal');
	if (event.target == adminmodal) {
		adminmodal.style.display = "none";
		adminhtmlTag.style.overflow = "auto";
		window.history.pushState("Changed URI", "", "../adminpage/HoneyAdminPage.html");
	}
}
