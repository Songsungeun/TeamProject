/**
 * 
 */
$("#submitMember").click(function(event) {
	var board = {
			userName: $("#name").val(),
			email: $("#user_Email").val(),
			nickname: $("#nickname").val(),
			phone: $("#phone").val(),
			password: $("#userPassword").val()
	}
	console.log(board)
	ajaxAddMember(board)
});

$("#unregisterBtn").click(function(event) {
	var memberNumber = $("#memberNumber").val();
	ajaxUnregister(memberNumber);
	location.href = "../mainpage/Main.html"
});

function ajaxAddMember(user) {
	$.ajax({
		url: "joinMember.json",
		type: "POST",
		dataType: "json",
		data: user,
		success: function (obj) {
			console.log(obj.jsonResult)
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("you fail!")
				return
			}
			window.location.href = "../mainpage/Main.html"
		},
		error: function(result) {
			console.log(result.state)
		}
	})
	console.log("byebye~")
}

function ajaxUnregister(memberNo) {
	$.getJSON("unregisteMember.json", {
		memberNo: memberNo
	}, function(obj) {
		console.log(obj.jsonResult)
		var result = obj.jsonResult
		alert("회원탈퇴 성공입니다.")
		location.href = "../mainpage/Main.html"
			if (result == "fail") {
				alert("헤헿 실패 ^^")
				location.href = "../mainpage/Main.html";
			}
	})
}
