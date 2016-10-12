/**
 * 
 */


function ajaxUserProfileLoder() {
	
	$.getJSON(serverAddr + "/membership/userInfoDetail.json", function(obj) {
			var result=obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		};
		$("#userEmailInfo").val(result.data.email); 
		$("#userNickNameInfo").val(result.data.nickname);
		$("#userNameInfo").val(result.data.userName);
		$("#userTelInfo").val(result.data.phone);
	 })
}

function ajaxUserStatusUpdate(userStatusChangeInfo) {
	$.post("userStatusUpdate.json", userStatusChangeInfo, function(obj) {
		var result=obj.jsonResult
		if (result.state !="success") {
			console.log(result.state)
			alert("수정 실패입니다.")
			return
		} 
		alert("수정 완료! 메인페이지로 이동합니다.")
		location.href="/TeamProject/mainpage/Main.html"
			},"json")
}