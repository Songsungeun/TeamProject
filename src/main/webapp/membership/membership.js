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
	console.log("hi?")
	$.ajax({
		url: "add.json",
		type: "POST",
		dataType: "json",
		data: user,
		success: function (result) {
			if (result.state != "success") {
				alert("you fail!")
				return
			}
			console.log("nihao?")
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
	}, function(result) {
		console.log(result)
		alert("회원탈퇴 성공입니다.")
		console.log("히히히")
		location.href = "../mainpage/Main.html"
	})
	if (result == "fail") {
	alert("헤헿 실패 ^^")
	location.href = "../mainpage/Main.html";
	}
	
}
