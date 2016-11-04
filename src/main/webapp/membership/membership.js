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
	ajaxAddMember(board)
	event.stopImmediatePropagation();
	}
	);

$("#unregisterBtn").click(function(event) {
	var result = confirm("Are you sure?")
	
	if (result) {
	var memberNumber = $("#memberNumber").val();
	ajaxUnregister(memberNumber);
	location.href = "../mainpage/Main.html"
	}
	else {
		return
	}
	event.stopImmediatePropagation();
});

function ajaxAddMember(user) {
	$.ajax({
		url:serverAddr + "/membership/joinMember.json",
		type: "POST",
		dataType: "json",
		data: user,
		success: function (obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("you fail!")
				return
			}
			window.location.href = "../mainpage/Main.html"
		},
		error: function(result) {
		}
	})
}

function ajaxUnregister(memberNo) {
	$.getJSON(serverAddr + "/mainpage/unregisteMember.json", {
		memberNo: memberNo
	}, function(obj) {
		var result = obj.jsonResult
		alert("회원탈퇴 성공입니다.")
		location.href = "../mainpage/Main.html"
			if (result == "fail") {
				alert("헤헿 실패 ^^")
				location.href = "../mainpage/Main.html";
			}
	})
}
