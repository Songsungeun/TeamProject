/**
 * 
 */



/*
$("#logoutBtn").click(function(event) {
	location.href = "../mainpage/Main.html"
	ajaxLogout()
});
*/


function ajaxLogin(user) {
	$.ajax({
		url: serverAddr + "/mainpage/login.json",
		method: "POST",
		dataType: "json",
		data: user,
		success: function(obj) {
			var result = obj.jsonResult
		    if (result.state != "success") {
	            alert("로그인 실패입니다.\n이메일 또는 암호를 확인하세요.")
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
		$("#profilePicture").attr('src',"/TeamProject/upload/"+result.data.profilePhoto)
		/*
		var source = $('#guiderInfoTemplate').html();
		var template = Handlebars.compile(source);
		var data = result.data.guiderInfo
		data.stringify = JSON.stringify(data);
		var boards = template(data);
		$(".insertGuiders").append(boards);
		
		
		$(".userID").click(function(event) {
			location.href = "/TeamProject/membership/otherUserDetailPage.html?nick=" +  $(this).attr("data-nickName");
		})
		*/
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






