/**
 * 
 */



/*
$("#logoutBtn").click(function(event) {
	location.href = "../mainpage/Main.html"
	ajaxLogout()
});
 */


function ajaxLogin(user, fbuser) {
	$.ajax({
		url: serverAddr + "/mainpage/login.json",
		method: "POST",
		dataType: "json",
		data: user,
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				ajaxAddFacebookMember(fbuser)
				ajaxLogin(user)
				return
			}
			window.location.href = "../mainpage/Main.html"
		},
		error: function(msg) {
			alert(msg)
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
		console.log("size" + imgSrc.length)
		
		for (var i = 0; i <= splitImgSrc.length; i++) {
		console.log(i + ":" + splitImgSrc[i])
		}
		if(splitImgSrc.length == 2) {
		$("#profilePicture").attr('src',"/TeamProject/upload/"+splitImgSrc[0] + "." + splitImgSrc[1])
		} else {
			$("#profilePicture").attr('src',"http://graph.facebook.com/"+splitImgSrc[0] + "/picture")
		}
		//  $('#image').attr('src','http://graph.facebook.com/' + fbUser.id + '/picture');
	})


}






function ajaxLogout(user) {
	$.getJSON(serverAddr + "/mainpage/logout.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success")
			alert("로그아웃 실패입니다.")
	})
	alert("메인 페이지로 이동합니다.")
}






