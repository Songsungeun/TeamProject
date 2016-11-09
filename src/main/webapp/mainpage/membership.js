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
	var result = confirm("정말탈퇴하시겠습니까?")
	
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
				alert("가입실패 하였습니다. 정확히 입력 후 재시도 해주세요")
				return
			}
			alert("축하합니다 가입되었습니다.")
			window.location.href = "../mainpage/Main.html"
		},
		error: function(result) {
		}
	})
}

function ajaxAddFacebookMember(user) {
	$.ajax({
		url:serverAddr + "/membership/facebookLoginMember.json",
		type: "POST",
		dataType: "json",
		data: user,
		
		success: function (obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
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
