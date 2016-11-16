/**
 * 
 */


var status 
var msg
 var userNickName;
$(".message-history-new").click(function(event){
	$("#userNickName").val("")
	$(".message-input-textarea").val("")
});

$("#answerMessage").click(function(event){
	$('#message-new-popup_2').modal('show')
	$('.temp').val(userNickName)
});


$(".btn-primary").click(function(event){
	var messageContents = {
		    nickName:$("#userNickName").val(), message:$(".message-input-textarea").val()
			}
	ajaxSendMessage(messageContents)
	$('#message-new-popup').modal('hide')
});



$("#resendBtn").click(function(event){
	
	var messageContents = {
			nickName:$("#reSendedUsernickName").val(), message:$("#answerMessageToUser").val()
	}
	ajaxSendMessage(messageContents)
	$('#message-new-popup_2').modal('hide')
})


var memberNo 
function ajaxMessageUserLode() {
	$.getJSON(serverAddr + "/membership/messageUserLode.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		} else {
			var source = $('#messageUserInfoTemplate').html();
			var template = Handlebars.compile(source);
			var data = result.data
			data.stringify = JSON.stringify(data);
			var messageUser = template(data);
			$(".tempparea").html(messageUser);
		}
		$(".message-history-link").click(function(event) {
			memberNo = $(this).attr("data-memberNo")
			ajaxMessageContentsLode(memberNo)
		});	
	})
}


function ajaxMessageContentsLode(memberNo) {
	$.ajax({
		url:serverAddr + "/membership/messageContentsLode.json",
		type:"post",
		dataType: "json",
		data :{memberNo:memberNo},
		success: function(obj){
			var result = obj.jsonResult
			if(result.state != "success") {
				swal("메시지 로딩에 실패하였습니다.", "다시 시도해 주세요.", "error")
				return
			}
			
			var source = $('#messageUserMessageTemplate').html();
			var template = Handlebars.compile(source);
			
			var data = result.data
			var messagecontents = template(data);
			$("#messagesArea").html(messagecontents);
			$(".messageContents").click(function(event){
				var messageNo = $(this).attr("data-messageNo")
				ajaxUpdateMessageStatus(messageNo, memberNo)
				ajaxNewMessageAlam();
			})
			
			$(".messageContents").click(function(event) {
			     msg = $(this).attr("data-msg")
			     userNickName =$(this).attr("data-nickName")
			     $("#msgConts").text(msg)
			});	
			
		} 
	})
}


function ajaxSendMessage(messageContents) {
	$.ajax({
		url:serverAddr + "/membership/sendMessage.json",
		type: "POST",
		dataType: "json",
		data: messageContents,
		success: function (obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				swal("메세지 전송을 실패하였습니다.", "이름이나 닉네임을 확인해주세요.", "error")
				return
			}
		},
		error: function(result) {
		}
	})
}

function ajaxUpdateMessageStatus(messageNo, memberNo) {
	$.ajax({
		url: serverAddr +"/membership/updateMessageStatus.json",
		type:"POST",
		data : {messageNo: messageNo},
		success: function(obj) {
			ajaxMessageContentsLode(memberNo)
		}
	})
}