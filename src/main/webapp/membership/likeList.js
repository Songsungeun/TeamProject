/**
 * 
 */


function checkingLike(no) {
	$.ajax({
		url:serverAddr +"/mainpage/checkingLike.json",
		type: "POST",
		dataType:"json",
		data: {no:no},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				$('#likeBtn').css("color", "red")
			} else {
				$('#likeBtn').css("color", "black")
			}
		}
		})
	}


function aJaxLikeBoard(no) {
		$.ajax({
			url:serverAddr +"/mainpage/likeBoard.json",
			type: "POST",
			dataType:"json",
			data: {no:no},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function(obj) {
				var result = obj.jsonResult
				 if (result.state != "success" && result.data == 0){
					 var confirmResult = confirm("좋아요를 취소하시겠습니까?")
					 if (confirmResult == true) {
						 ajaxLikeDisconnect(no);
					 }
					return
				} else if (result.state != "success" && result.data == null){
					alert("로그인후 이용해 주세요!")
					return
				}  else {
					$('#likeBtn').css("color", "red")
				}
			},
			error: function(result) {
				console.log(result.state)
			}
		})
	}


function ajaxLikeDisconnect(no) {
	$.ajax({
		url:serverAddr +"/mainpage/likeDisconnect.json",
		type: "POST",
		dataType:"json",
		data: {no:no},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state == "success") {
				$('#likeBtn').css("color", "black")
			} else {
				$('#likeBtn').css("color", "red")
			}
		}
		})
	}