function followLoderFunc (tempUserNo) {
	var userNo = tempUserNo;
	$("#followBtn").click(function(event) {
		aJaxFollowUser(userNo)
	})
}




function aJaxFollowUser(userNo) {
	$.ajax({
		url:serverAddr +"/mainpage/otherUserFollow.json",
		type: "POST",
		dataType:"json",
		data: {memberNo:userNo},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success" && result.data == 0){
					alert("이미 팔로우중인 회원입니다.")
					return
				} else if (result.state != "success" && result.data == null){
				alert("로그인후 이용해 주세요!")
				return
				}
		},
		error: function(result) {
			console.log(result.state)
		}
	})
}