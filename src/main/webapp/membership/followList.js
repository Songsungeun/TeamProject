function followLoderFunc (tempUserNo) {
	var userNo = tempUserNo;
	$("#followBtn").click(function(event) {
		aJaxFollowUser(userNo)
	})
	checkingFollow(userNo)
}




function checkingFollow(userNo) {
	$.ajax({
		url:serverAddr +"/mainpage/checkingFollow.json",
		type: "POST",
		dataType:"json",
		data: {memberNo:userNo},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				$('#followBtn').css("color", "red")
			} else {
				$('#followBtn').css("color", "black")
			}
		}
		})
	}

function ajaxFollowDisconnect(userNo) {
	$.ajax({
		url:serverAddr +"/mainpage/followDisconnect.json",
		type: "POST",
		dataType:"json",
		data: {memberNo:userNo},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				$('#followBtn').css("color", "black")
			} else {
				$('#followBtn').css("color", "red")
			}
		}
		})
	}

	function aJaxFollowUser(userNo) {
		console.log($("#writerNick").text())
		$.ajax({
			url:serverAddr +"/mainpage/otherUserFollow.json",
			type: "POST",
			dataType:"json",
			data: {memberNo:userNo},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function(obj) {
				var result = obj.jsonResult
				if ( $("#writerNick").text() == loginUserNickname){
					alert("욕심쟁이 우후훗")
					return
				} else if (result.state != "success" && result.data == 0){
					 var confirmResult = confirm("follow를 취소하시겠습니까?")
					 if (confirmResult == true) {
						 ajaxFollowDisconnect(userNo);
						 event.stopImmediatePropagation();
					 }
					return
				} else if (result.state != "success" && result.data == null){
					alert("로그인후 이용해 주세요!")
					return
				} else {
					$('#followBtn').css("color", "red")
				}
			},
			error: function(result) {
				console.log(result.state)
			}
		})
	}