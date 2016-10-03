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
			console.log("@@@@@@@@@@@@@@@@@@0")
			if (result.state != "success") {
				alert("you fail!")
				return
			}
			console.log("nihao?")
			window.location.href = "../mainpage/Main.html"
		},
		error: function(result) {
			console.log("@!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@0")
			console.log(result.state)
		}
	})
	console.log("byebye~")
	
}