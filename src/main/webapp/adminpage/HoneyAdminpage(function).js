
var admin = { 
	pageNo :1,
	pageLength : 6,
	stateResultCode1 : 1,
	stateResultCode2 : 0,
	adminList : "/admin/adminPostlist.json",
	likeList :  "/admin/adminLikeList.json"
}

var ajaxUrl = admin.adminList;
var stateResultCode = admin.stateResultCode1
			
$(document.body).on('click', '.moreViewBtn', function(event){
	admin.pageLength += 6;
	ajaxBoardList()
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
			var result = confirm("좋아요가 취소되요..! \n 계속 하실껀가요?");
			if(result == true) {
				// 확인 버튼 누를시 
				ajaxLikeDisconnect(rNumber)
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
	ajaxBoardList(ajaxUrl , stateResultCode)
	$('#cardWrap').show();  
})

$(".conterDetailBtn1").click(function () {
	if($("#tableWrap").css("display") != "none"){   
		$("#layoutBtn").attr("src", "./images/layout-2.svg")
		$("#listBtn").attr("src", "./images/list-1.svg")
		$('#tableWrap').hide();
		$('#cardWrap').show();  
	}});

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
		
		
function ajaxBoardList() {
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
		var totalsize = data.totalPage;
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
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			ajaxLoadBoard(no)
			ajaxPostComentsList(no)
		})

		if (data.list.length >=  totalsize) {
			$('.moreViewBtn').css("display", "none")
		} 

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
				window.location.reload();
				return
			}
			alert("삭제되었습니다.")
			window.location.reload();
		})
}


function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/admin/postdetail.json?no=" + no, function(obj) {
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
			window.location.href = "../../UserStorageAdminPage.html"
		})
		$(".owner_img").click(function(event) {
			window.location.href = "../../UserStorageAdminPage.html"
		})
	})
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
					"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
					"<div class='coment_ud'>" +
					"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
					"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
					"<div class='replyArea'></div>" +
					"<div class='cmt-btn-wrap'>" +
					"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
					"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
					"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
					"</div>" + "</div>" + "</div>"
				} 
				if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
					contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
					"<div class='coment_info'>" +
					"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
					"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
					"<div class='coment_ud'>" +
					"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
					"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
					"<div class='replyArea'></div>" +
					"<div class='cmt-btn-wrap'>" +
					"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
					"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
					"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
					"</div>" + "</div>" + "</div>"
				}
			}
		$(".userComment > .cmts_list").html(contents);
	})
}
