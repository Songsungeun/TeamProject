var tempUserNo = 0;
var boardNo = 0;
var comentInfo = 0;
var detailBoardNo = 0;
var length = 20;
$(document).ready(function(){
//	$(function() {
//		$("#includedContent").load("../header.html");
//	});
	// 페이지가 로딩될 때 'Loading 이미지'를 숨긴다.
	$('#viewLoading').hide();
	// ajax 실행 및 완료시 'Loading 이미지'의 동작을 컨트롤하자.
	$('#viewLoading')
	.ajaxStart(function()
	{
		// 로딩이미지의 위치 및 크기조절	
		$('#viewLoading').css('position', 'absolute');
		$('#viewLoading').css('left', $('#loadData').offset().left);
		$('#viewLoading').css('top', $('#loadData').offset().top);
		$('#viewLoading').css('width', $('#loadData').css('width'));
		$('#viewLoading').css('height', $('#loadData').css('height'));

		//$(this).show();
		$(this).fadeIn(500);
	})
	.ajaxStop(function()
	{
		//$(this).hide();
		$(this).fadeOut(500);
	});
	
	ajaxBoardList(length);
	
	$(document).scroll(function() {
		var maxHeight = $(document).height();
		var currentScroll = $(window).scrollTop() + $(window).height();

		if (maxHeight <= currentScroll) {
			length += 20;
		ajaxBoardList(length);
		}
		})
}); 

function ajaxBoardList(length) {
	$.getJSON(serverAddr + "/mainpage/postlist.json", 
			{"length" : length
		},function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
//		var template1 = Handlebars.compile($('#li1TemplateText').html())
//		$(".category_tab-1-0").html(template1(result));
//		var template2 = Handlebars.compile($('#li2TemplateText').html())
//		$(".category_tab-2-0").html(template2(result));
//		var template3 = Handlebars.compile($('#li3TemplateText').html())
//		$(".category_tab-3-0").html(template3(result));
//		var template4 = Handlebars.compile($('#li4TemplateText').html())
//		$(".category_tab-4-0").html(template4(result));
		var list1 = result.data.list1;
		boardLists(list1, 1, 0);
		var list2 = result.data.list2;
		boardLists(list2, 2, 0);
		var list3 = result.data.list3;
		boardLists(list3, 3, 0);
		var list4 = result.data.list4;
		boardLists(list4, 4, 0);
		
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$('#yourModal').on('hidden.bs.modal', function (e) {
				  //동영상 정지 메서드호출
				$("#youtubeUrl").attr("src","");
			})
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
function boardLists(list, no, ctgno) {
	var boards = "";
	for(var i = 0; i<list.length; i++ ) {
		if(list[i].linkImage != "/TeamProject/upload/MainDefault.jpg"){
		boards +=  "<li id='each_post_wrap'>" +
		  "<div id='each_post'>" +
		    "<div class='post_photoWrap titleLink' data-no='"+list[i].no+"' data-userNo='"+list[i].userNo+"'>"+
		        "<img id='thumbImg' src='"+list[i].linkImage+"' alt='Image File'>"+
		    "</div>"+
		    "<div class='post_contsWrap'>"+
		      "<div class='each_post_title titleLink' data-no='"+list[i].no+"' data-userNo='"+list[i].userNo+"'>"+list[i].title+
		      "</div>"+
		      "<div class='post_ctgWrap'>"+
		        "<img id='ctg_Img' src='/TeamProject/mainpage/mainpage_images/category.png'>"+
		        "<span class='categoryLink' data-ctg='"+list[i].categoryNo+"'>"+list[i].category+"</span>"+
		      "</div>"+
		      "<div class='each_post_contents titleLink' data-no='"+list[i].no+"' data-userNo='"+list[i].userNo+"'>"+
		        "<span>"+list[i].contents+"</span>"+
		      "</div>"+
		    "</div>"+
		    "<div class='post_BtnWrap'>"+
		      "<div id='user_Nick'>"+
		        "<img id='profilePicture' class='user_Nonepht userInfoLink' data-userImage='"+list[i].userProfilePath+"' src='"+list[i].userProfilePath+"' alt='userImg' data-userNo='"+list[i].userNo+"' data-userNick='"+list[i].writerNick+"'>"+
		        "<span class='userInfoLink' data-userNo='"+list[i].userNo+"' data-userNick='"+list[i].writerNick+"'>"+list[i].writerNick+"</span>"+
		      "</div>"+
		      "<div class='post_rightBtn'>"+
		        "<div class='vw_ctHover'>"+
		          "<img class='viewCountImg' src='/TeamProject/mainpage/mainpage_images/viewCount.png' alt='view'>"+
		          "<div class='viewCount'>"+list[i].viewCount+"</div>"+
		        "</div>"+
		        "<div class='likeHover'>"+
		          "<img class='like_OnclickImg' src='/TeamProject/mainpage/mainpage_images/likeOnClick.png' alt='like'>"+
		          "<div class='like_Onclick'>"+list[i].like+"</div>"+
		        "</div>"+
		      "</div>"+
		    "</div>"+
		  "</div>"+
		"</li>"
		}
		if(list[i].linkImage == "/TeamProject/upload/MainDefault.jpg"){
			boards +=  "<li id='each_post_wrap'>" +
			  "<div id='each_post'>" +
			    "<div class='post_photoWrap titleLink' data-no='"+list[i].no+"' data-userNo='"+list[i].userNo+"'>"+
			    "</div>"+
			    "<div class='post_contsWrap'>"+
			      "<div class='each_post_title titleLink' data-no='"+list[i].no+"' data-userNo='"+list[i].userNo+"'>"+list[i].title+
			      "</div>"+
			      "<div class='post_ctgWrap'>"+
			        "<img id='ctg_Img' src='/TeamProject/mainpage/mainpage_images/category.png'>"+
			        "<span class='categoryLink' data-ctg='"+list[i].categoryNo+"'>"+list[i].category+"</span>"+
			      "</div>"+
			      "<div class='each_post_contents titleLink' data-no='"+list[i].no+"' data-userNo='"+list[i].userNo+"'>"+
			        "<span>"+list[i].contents+"</span>"+
			      "</div>"+
			    "</div>"+
			    "<div class='post_BtnWrap'>"+
			      "<div id='user_Nick'>"+
			        "<img id='profilePicture' class='user_Nonepht userInfoLink' data-userImage='"+list[i].userProfilePath+"' src='"+list[i].userProfilePath+"' alt='userImg' data-userNo='"+list[i].userNo+"' data-userNick='"+list[i].writerNick+"'>"+
			        "<span class='userInfoLink' data-userNo='"+list[i].userNo+"' data-userNick='"+list[i].writerNick+"'>"+list[i].writerNick+"</span>"+
			      "</div>"+
			      "<div class='post_rightBtn'>"+
			        "<div class='vw_ctHover'>"+
			          "<img class='viewCountImg' src='/TeamProject/mainpage/mainpage_images/viewCount.png' alt='view'>"+
			          "<div class='viewCount'>"+list[i].viewCount+"</div>"+
			        "</div>"+
			        "<div class='likeHover'>"+
			          "<img class='like_OnclickImg' src='/TeamProject/mainpage/mainpage_images/likeOnClick.png' alt='like'>"+
			          "<div class='like_Onclick'>"+list[i].like+"</div>"+
			        "</div>"+
			      "</div>"+
			    "</div>"+
			  "</div>"+
			"</li>"
			}
	}
	$(".category_tab-"+no+"-"+ctgno).html(boards);
}
function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		var fileList = '';
		checkingFollow(result.data.board.userNo);
		checkingLike(result.data.board.no);
		if (result.state != "success") {
			swal("조회 실패입니다.")
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
					fileList += "<a id='fileListArea'" +"href='http://52.78.179.146:8080/TeamProject/upload/" 
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
				swal({
					  title:"로그인 되지 않았습니다.",
					  text: "로그인후 이용해 주세요",
					  type: "warning",
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "로그인",
					  closeOnConfirm: false,
					},
					function(isConfirm){
					  if (isConfirm) {
						  window.location = "../mainpage/LoginPage.html"
					  } 
			 	 })
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
			swal("서버에서 데이터를 가져오는데 실패했습니다.")
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
				swal({
					  title:"로그인 되지 않았습니다.",
					  text: "로그인후 이용해 주세요",
					  type: "warning",
					  confirmButtonColor: "#DD6B55",
					  confirmButtonText: "로그인",
					  closeOnConfirm: false,
					},
					function(isConfirm){
					  if (isConfirm) {
						  window.location = "../mainpage/LoginPage.html"
					  } 
			 	 })
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
			swal("조회 실패입니다.")
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
	swal({
		  title: "댓글 변경",
		  text: "정말 변경하시겠습니까?",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "변경하기",
		  cancelButtonText: "취소하기",
		  closeOnConfirm: false,
		  closeOnCancel: false
		},
	function(isConfirm) {
			if (isConfirm) {
				event.stopImmediatePropagation();
				$.ajax({
					url:serverAddr +"/mainpage/updateComment.json",
					type: "POST",
					dataType:"json",
					data: honeyComent,
					success: function(obj) {
						var result = obj.jsonResult
						if (result.state != "success") {
							sweetAlert("변경실패!", "변경 실패했어요.", "error");
							return
						}
						sweetAlert("변경성공!", "댓글이 변경되었어요.", "success");
						var no = boardNo;
						ajaxPostComentsList(no);
					}
				})
			} else {
				return;
				
			}
		})
	
	
});
$(document.body).on("click",".cmt_delete",function(event) {
	var depth = $(this).attr("data-depth")
	var no = $(this).attr("data-Delete");
	
	if(depth == 0) {
		swal({
			  title: "댓글 삭제",
			  text: "정말 삭제하시겠습니까?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "삭제하기",
			  cancelButtonText: "취소하기",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
		function(isComfirm) {
				if (isComfirm) {
					event.stopImmediatePropagation();
					$.ajax({
						url:serverAddr +"/mainpage/delete.json",
						type: "GET",
						dataType:"json",
						data: {no: no},
						success: function(obj) {
							var result = obj.jsonResult
							if (result.state != "success") {
								sweetAlert("삭제실패!", "삭제 실패했어요.", "error");
								return
							}
							sweetAlert("삭제성공!", "댓글이 삭제되었어요.", "success");
							var no = boardNo;
							ajaxPostComentsList(no);
						}
					})
				} else {
					return;
				}
			})
	} 
	if(depth == 1){
		swal({
			  title: "댓글 삭제",
			  text: "정말 삭제하시겠습니까?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "삭제하기",
			  cancelButtonText: "취소하기",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
			function(isConfirm) {
				
				if (isConfirm) {
					event.stopImmediatePropagation();
					$.ajax({
						url:serverAddr +"/mainpage/childdelete.json",
						type: "GET",
						dataType:"json",
						data: {no: no},
						success: function(obj) {
							var result = obj.jsonResult
							if (result.state != "success") {
								sweetAlert("삭제실패!", "삭제 실패했어요.", "error");
								return
							}
							sweetAlert("삭제성공!", "댓글이 삭제되었어요.", "success");
							var no = boardNo;
							ajaxPostComentsList(no);
						}
					})
				} else {
					return;
				}
			})
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
