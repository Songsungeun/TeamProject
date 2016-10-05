/**
 * 
 */


function ajaxUserProfileLoder(memberNumber) {
	$.getJSON("userInfoDetail.json", {memberNo:memberNumber
		}, function(obj) {
			var result=obj.jsonResult
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

function ajaxUserStatusUpdate(userStatusRenewalInfo) {
	$.post("userStatusUpdate.json", userStatusRenewalInfo, function(result) {
		if (result.state !="success") {
			alert("조회 실패입니다.")
			return
		}
		location.href="/TeamProject/adminpage/HoneyAdminPage.html"
			},"json")
}