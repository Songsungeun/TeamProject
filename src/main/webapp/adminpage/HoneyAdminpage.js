function ajaxloadNickName() {
	$.getJSON(serverAddr + "/admin/adminUserInfo.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("해당 회원 정보가 없습니다.")
			return
		}
		$("#userNickNameInfo").text(result.data.member.nickname);
		$("#userPhoto").attr("src", "/TeamProject/upload/" + result.data.profilePhoto);
		$("#viewCount").text(result.data.totalViewCount);
		$("#followers").text(result.data.followCollector);
		
	})
}

