/**
 * 
 */

$("#login_Button").click(function(event) {
	var user = {
    email: $("#email").val(),
    password: $("#password").val(),
  }
  console.log(user)
  ajaxLogin(user)
});

$("#logoutBtn").click(function(event) {
	location.href = "../mainpage/Main.html"
	ajaxLogout()
});

function ajaxLogin(user) {
	$.ajax({
		url: "login.json",
		method: "POST",
		dataType: "json",
		data: user,
		success: function(result) {
		    if (result.state != "success") {
	            alert("로그인 실패입니다.\n이메일 또는 암호를 확인하세요.")
	            return
	        }
	        window.location.href = "../mainpage/Main.html"	//테스트용이다. 작동 확인하고 페이지 바꿀것
		},
		error: function(msg) {
			alert(msg)
		}
	})
}

function ajaxLoginUser() {
	console.log("hi? i'm ajaxLoginUser() nice to meet you")
	
	$.getJSON("loginUser.json", function(result) {
		if (result.state != "success") {
			$('.userStatus').css("display", "none")
			$('#newWright').css("display", "none")
			$('.headlist').css("display", "none")
			return
		}
		$('.loginInfo').css("display", "none")
		$('#confirmLogin').css("display", "none")
		$("#userEmail").text(result.data.email);
		$("#memberNumber").val(result.data.memberNo);
	})
}

function ajaxLogout(user) {
	$.getJSON("logout.json", function(result) {
		if (result.state != "success")
	        console.log("로그아웃 실패입니다.")
    })
    alert("메인 페이지로 이동합니다.")
}


