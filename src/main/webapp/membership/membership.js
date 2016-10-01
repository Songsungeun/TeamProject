/**
 * 
 */
$("#submitMember").click(function(event) {
	var board = {
	userName: $("#name").val(),
	email: $("#email").val(),
	nickname: $("#nickname").val(),
	phone: $("#phone").val(),
	password: $("#password").val()
	}
	ajaxAddMember(board)
});



function ajaxAddMember(member) {
	console.log(member);
	
	$.post("add.json", member, function(result) {
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    }
	    window.location.href = "membership.html"
	}, "json")
}