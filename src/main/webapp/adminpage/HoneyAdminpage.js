function ajaxloadNickName() {
	$.getJSON(serverAddr + "/adminpage/userInfoDetail.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("해당 회원 정보가 없습니다.")
			return
		}
		$("#userNickNameInfo").text(result.data.nickname);
	})
}
