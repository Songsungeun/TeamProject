
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
		
		$.ajax({
			url:serverAddr +"/mainpage/otherUserFollow.json",
			type: "POST",
			dataType:"json",
			data: {memberNo:userNo},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success: function(obj) {
				var result = obj.jsonResult
				if ( $("#writerNick").text() == loginUserNickname){
					return
				} else if (result.state != "success" && result.data == 0){
					 var confirmResult = confirm("follow를 취소하시겠습니까?")
					 if (confirmResult == true) {
						 ajaxFollowDisconnect(userNo);
						 
					 }
					return
				} else if (result.state != "success" && result.data == null){
					swal({
						  title:"로그인 되지 않았습니다.",
						  text: "로그인후 이용해 주세요",
						  type: "warning",
						  confirmButtonColor: "#DD6B55",
						  confirmButtonText: "로그인",
						  closeOnConfirm: false,
						},
						function(isConfirm){
						  if (isConfirm) {
							  window.location = "../mainpage/LoginPage.html"
						  } 
				 	 })
					return
				} else {
					$('#followBtn').css("color", "red")
					var source = $('#guiderInfoTemplate').html();
					var template1 = Handlebars.compile(source);
					var data = result.data
					var boards = template1(data);
					$(".insertGuiders").append(boards);
				}
			},
			error: function(result) {
				console.log(result.state)
			}
		})
	}