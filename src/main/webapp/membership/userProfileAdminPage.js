/**
 * 
 */


$("#changeUserStatusInfo").click(function(event){
	event.stopImmediatePropagation();
	var userStatusChangeInfo = {
			userName: $("#userNameInfo").val(),
			email: $("#userEmailInfo").val(),
			nickname: $("#userNickNameInfo").val(),
			phone: $("#userTelInfo").val(),
			introduce: $("#userIntroduce").val()
	}
	ajaxUserStatusUpdate(userStatusChangeInfo) 

})

$("#changPassword").click(function(event){
	if ($("#changeNewPassword").val() != $("#newPasswordConfirm").val()) {
		sweetAlert("웁스...", "비밀번호가 일치하지 않아요", "error");
		return
	} else if ($("#changeNewPassword").val() == "" && $("#newPasswordConfirm").val() == ""){
		sweetAlert("웁스...", "비밀번호를 입력해 주세요", "error");
		
	}else {
		var newPassword ={password: $("#changeNewPassword").val()}
			ajaxPasswordChange(newPassword)
	}
	event.stopImmediatePropagation();
})



function ajaxUserProfileLoder() {

	$.getJSON(serverAddr + "/membership/userInfoDetail.json", function(obj) {
		var result=obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		};
		$("#userEmailInfo").val(result.data.email); 
		$("#userNickNameInfo").val(result.data.nickname);
		$("#userNameInfo").val(result.data.userName);
		$("#userTelInfo").val(result.data.phone);
		$("#userIntroduce").text(result.data.introduce);
	})
}

function ajaxUserStatusUpdate(userStatusChangeInfo) {
	$.post("userStatusUpdate.json", userStatusChangeInfo, function(obj) {
		var result=obj.jsonResult
		if (result.state !="success") {
			alert("수정 실패입니다.")
			return
		} else {
			swal("변경 완료!", "메인 페이지로 이동합니다.", "success")
			$(".confirm").click(function(event){
				location.href="/TeamProject/mainpage/Main.html"
			})
		}
	},"json")
}


function ajaxPasswordChange(newPassword) {
	$.post("changePassword.json", newPassword, function(obj) {
		var result=obj.jsonResult;
		if(result.state !="success") {
			return
		}
		swal("변경 완료!", "메인 페이지로 이동합니다.", "success")
		$(".confirm").click(function(event){
			location.href="/TeamProject/mainpage/Main.html"
		})
	},"json")
}

function ajaxUserProfileFileLoder() {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');
	$.getJSON(serverAddr+"/" + locationPath[2] + "/userProfileFileLoder.json", function(obj) {
		var result=obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		};
		var imgSrc = result.data
		var splitImgSrc = imgSrc.split(".")
		if(splitImgSrc.length == 2) {
		$("#profilePhoto").attr('src',"/TeamProject/upload/"+splitImgSrc[0] + "." + splitImgSrc[1])
		} else {
			$("#profilePhoto").attr('src',"http://graph.facebook.com/"+splitImgSrc[0] + "/picture")
		}
	})
}



