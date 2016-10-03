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


function ajaxDeleteBoard(no, password) {
	$.getJSON("unregister.json", {
		no: no,
	}, function(result) {
		if (result.state != "success") {
			alert("회원탈퇴 실패입니다.")
			return
		}
		alert("회원탈퇴 성공입니다.")
		location.href = "../mainpage/Main.html"
	})
}
