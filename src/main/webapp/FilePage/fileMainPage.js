$(document).ready(function() {
	$(function() {
		$("#includedContent").load("/TeamProject/header.html");
	});
	$("#ProfileEditLink").click(function() {
		window.location.href = "../membership/userProfileAdminPage.html"
	});
	$(".profileEdit_Btn").click(function() {
		window.location.href = "../membership/userProfileAdminPage.html"
	});
	
	$("#TipBoardLink").click(function() {
		window.location.href = "../adminpage/HoneyAdminPage.html"
	});
	$("#StorageLink").click(function() {
		window.location.href = "filepage.html"
	});
	$(".profileEdit_Btn").hover(function() {
		$("#ProfileEditLinkGear").css('-webkit-animation','spin 4s infinite linear')
		$("#ProfileEditLinkGear").css('-o-animation','spin 4s infinite linear')
		$("#ProfileEditLinkGear").css('-moz-animation','spin 4s infinite linear')
		$("#ProfileEditLinkGear").css('animation','spin 4s infinite linear')
	}, function() {
		$("#ProfileEditLinkGear").css('-webkit-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('-moz-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('-ms-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('-o-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('animation-play-state','paused')
	})
});


var pageNo = 1,
pageLength = 6;

function ajaxloadNickName() {
	$.getJSON(serverAddr + "/admin/adminUserInfo.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("해당 회원 정보가 없습니다.")
			return
		}
		$("#userNickNameInfo").text(result.data.member.nickname);
		var photoPath = result.data.profilePhoto;
		var photoPathSplit = photoPath.split(".");
		if (photoPathSplit.length == 2) {
			$("#userPhoto").attr('src',"/TeamProject/upload/"+photoPathSplit[0] + "." + photoPathSplit[1]);
		} else {
			$("#userPhoto").attr('src',"http://graph.facebook.com/"+photoPathSplit[0] + "/picture");
		}
		$("#viewCount").text(result.data.totalViewCount);
		$("#followers").text(result.data.followCollector);
		$("#user-introduce").text(result.data.userInfo)

	})
}

function ajaxFileList() {

	$.getJSON(serverAddr + "/FilePage/getFileList.json",  function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패하였습니다.")
			return
		}

		var data = result.data
//		var totalsize = data.totalPage;
		var cloudUiTemplate = Handlebars.compile($('#CloudUiTemplateText').html())
		$("#boardTable > tbody").html(cloudUiTemplate(data));			

//		$(".titleLink").click(function(event) {
//		window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 

//		if (pageLength >  totalsize) {
//		$('.moreViewBtn').css("display", "none")
//		} 
		$(document.body).on('click', '.btn-danger',  function(event) {
			var rNumber = $(this).attr("data-no")
			var result = confirm("게시물을 삭제하시겠습니까?\n삭제한 게시물은 복구 불가능합니다.");
			if(result) {
				// 확인 버튼 누를시 
				//ajaxDeleteBoard(rNumber)
				alert("확인버튼");
			} else {
				//취소 버튼 누를시 
			}
		});
	})
}


