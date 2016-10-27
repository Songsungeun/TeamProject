/**
 * 
 */


 $("#changeUserStatusInfo").click(function(event){
    var userStatusChangeInfo = {
        userName: $("#userNameInfo").val(),
        email: $("#userEmailInfo").val(),
        nickname: $("#userNickNameInfo").val(),
        phone: $("#userTelInfo").val()
    }
    ajaxUserStatusUpdate(userStatusChangeInfo) 
 })

 $("#changPassword").click(function(event){
  if ($("#changeNewPassword").val() != $("#newPasswordConfirm").val()) {
    alert("비밀번호가 일치하지 않습니다.")
    return
  } else {
    var newPassword ={password: $("#changeNewPassword").val()}
    var result = confirm("Are you sure?")
    console.log(result)
    if(result != true) {
      return
    } else {
      ajaxPasswordChange(newPassword)
    }
  }
  
})



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


function ajaxPasswordChange(newPassword) {
	$.post("changePassword.json", newPassword, function(obj) {
		var result=obj.jsonResult;
		if(result.state !="success") {
			console.log(result.state)
			alert("변경 실패입니다.")
			return
		}
		alert("변경 완료! 메인 페이지로 이동합니다.")
		location.href="/TeamProject/mainpage/Main.html"
	},"json")
}

function ajaxUserProfileFileLoder() {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');
	$.getJSON(serverAddr+"/" + locationPath[2] + "/userProfileFileLoder.json", function(obj) {
		var result=obj.jsonResult
	if (result.state != "success") {
		alert("조회 실패입니다.")
		return
	};
	$("#profilePhoto").attr('src',"/TeamProject/upload/"+result.data)
 })
}



