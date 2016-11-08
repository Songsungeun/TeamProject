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

function ajaxloadNickName() {
	$.getJSON(serverAddr + "/admin/adminUserInfo.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("해당 회원 정보가 없습니다.")
			return
		}
		$("#userNickNameInfo").text(result.data.member.nickname);
		$("#userPhoto").attr("src", "/TeamProject/upload/" + result.data.profilePhoto);
		$("#viewCount").text(result.data.totalViewCount);
		$("#followers").text(result.data.followCollector);
		$("#user-introduce").text(result.data.userInfo)
		
	})
}

