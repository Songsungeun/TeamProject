/**
 * 
 */


function ajaxUserProfileLoder(memberNumber) {
	$.getJSON("userInfoDetail.json", {memberNo:memberNumber
		}, function(result) {
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		};
		$("#userEmailInfo").val(result.data.email); 
		$("#userNickNameInfo").val(result.data.nickname);
		$("#userNameInfo").val(result.data.userName);
		$("#userTelInfo").val(result.data.phone);
		$("#previousUserPassword").val(result.data.password);
	 })
}

function ajaxUserStatusUpdate() {
	
}