/**
 * 
 */
function ajaxNewMessageAlam() {
	$.ajax({
		url: serverAddr + "/mainpage/newMessageAlam.json",
		method:"POST",
		dataType:"json",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				return
			}
			$('#newMessageAlert').text(result.data);
		}
		
	})
}


function ajaxFacebookLogin(user, fbuser) {
	$.ajax({
		url: serverAddr + "/mainpage/login.json",
		method: "POST",
		dataType: "json",
		data: user,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				ajaxAddFacebookMember(fbuser)
				ajaxFacebookLogin(user)
				return
			}
			window.location.href = "../mainpage/Main.html"
		},
		error: function(msg) {
		}
	})
}

function ajaxLogin(user) {
	$.ajax({
		url: serverAddr + "/mainpage/login.json",
		method: "POST",
		dataType: "json",
		data: user,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				swal("로그인에 실패하였습니다.", "이메일 또는 비밀번호를 확인해주세요.", "error")
				return
			}
			window.location.href = "../mainpage/Main.html"
		},
		error: function(msg) {
		}
	})
}
var loginUserNickname;
function ajaxLoginUser() {
	$.getJSON(serverAddr + "/mainpage/loginUser.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			$('.userStatus').css("display", "none")
			$('#newWrite').css("display", "none")
			$('.headlist').css("display", "none")
			$('#logout').css("display","none")
			return
		}
		loginUserNickname = result.data.member.nickname
		$('.loginInfo').css("display", "none")
		$('#confirmLogin').css("display", "none")
		$("#userEmail").text(result.data.member.email);
		var imgSrc = result.data.profilePhoto
		var splitImgSrc = imgSrc.split(".")
		if(splitImgSrc.length == 2) {
		$("#profilePicture").attr('src',"/TeamProject/upload/"+splitImgSrc[0] + "." + splitImgSrc[1])
		} else {
			$("#profilePicture").attr('src',"http://graph.facebook.com/"+splitImgSrc[0] + "/picture")
		}
	})


}






function ajaxLogout(user) {
	$.getJSON(serverAddr + "/mainpage/logout.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success")
			alert("로그아웃 실패입니다.")
	})
}






