/**
 * 
 */


$("#submitMember").click(function(event) {
	
	var board = {
			userName: $("#name").val(),
			email: $("#user_Email").val(),
			nickname: $("#nickname").val(),
			phone: $("#phone").val(),
			password: $("#userPassword").val()
	}
	ajaxAddMember(board)
	event.stopImmediatePropagation();
	}
	);

$("#unregisterBtn").click(function(event) {
	swal({
  title: "정말 탈퇴하시겠습니까?",
  text: "탈퇴 하시면 모든 정보는 삭제됩니다!",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "네, 탈퇴하겠습니다.!",
  cancelButtonText: "아니요, 다시 한번 생각해볼께요!",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
    swal("탈퇴처리 완료되었습니다!", "", "success");
    var memberNumber = $("#memberNumber").val();
	ajaxUnregister(memberNumber);
	location.href = "../mainpage/Main.html"
  } else {
    swal("취소하셨습니다!", "", "error");
    return
  }
});
	event.stopImmediatePropagation();
});

function ajaxAddMember(user) {
	$.ajax({
		url:serverAddr + "/membership/joinMember.json",
		type: "POST",
		dataType: "json",
		data: user,
		
		success: function (obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("가입실패 하였습니다. 정확히 입력 후 재시도 해주세요")
				return
			}
			swal("환영합니다!", "가입해 주셔서 감사합니다! 즐거운 시간 되세요.", "success")
			$(".confirm").click(function(event){
				window.location.reload();
			})
		},
		error: function(result) {
		}
	})
}



function ajaxAddFacebookMember(user) {
	$.ajax({
		url:serverAddr + "/membership/facebookLoginMember.json",
		type: "POST",
		dataType: "json",
		data: user,
		success: function (obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				return
			}
			window.location.href = "../mainpage/Main.html"
		},
		error: function(result) {
		}
	})
}

function ajaxUnregister(memberNo) {
	$.getJSON(serverAddr + "/mainpage/unregisteMember.json", {
		memberNo: memberNo
	}, function(obj) {
		var result = obj.jsonResult
		location.href = "../mainpage/Main.html"
			if (result == "fail") {
				location.href = "../mainpage/Main.html";
			}
	})
}





/*
function ajaxAddMember(user) {
	$.ajax({
		url:serverAddr + "/membership/joinMember.json",
		type: "POST",
		dataType: "json",
		data: user,
		success: function (obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("you fail!")
				return
			}
			window.location.href = "../mainpage/Main.html"
		},
		error: function(result) {
		}
	})
}

function ajaxUnregister(memberNo) {
	$.getJSON(serverAddr + "/mainpage/unregisteMember.json", {
		memberNo: memberNo
	}, function(obj) {
		var result = obj.jsonResult
		alert("회원탈퇴 성공입니다.")
		location.href = "../mainpage/Main.html"
			if (result == "fail") {
				alert("헤헿 실패 ^^")
				location.href = "../mainpage/Main.html";
			}
	})
}
*/