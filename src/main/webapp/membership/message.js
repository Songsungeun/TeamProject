/**
 * 
 */

$(".message-history-new").click(function(event){
	$("#userNickName").val("")
	$(".message-input-textarea").val("")
});

$(".btn-primary").click(function(event){
	var messageContents = {
			nickName:$("#userNickName").val(), message:$(".message-input-textarea").val()
	}
	ajaxSendMessage(messageContents)
});





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
			$(".tempparea").append(messageUser);
		}
		$(".message-history-link").click(function(event) {
			var memberNo = $(this).attr("data-memberNo")
			ajaxMessageContentsLode(memberNo)
		});	
	})
}


function ajaxMessageContentsLode(memberNo) {
	console.log(memberNo)
	$.ajax({
		url:serverAddr + "/membership/messageContentsLode.json",
		type:"post",
		dataType: "json",
		data :{memberNo:memberNo},
		success: function(obj){
			
		}
	})
	
}



function ajaxSendMessage(messageContents) {
	console.log(messageContents)
	$.ajax({
		url:serverAddr + "/membership/sendMessage.json",
		type: "POST",
		dataType: "json",
		data: messageContents,
		success: function (obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("메세지 전송을 실패하였습니다. 이름이나 닉네임을 확인해주세요")
				return
			}
		},
		error: function(result) {
		}
	})
}


function ajaxUpdateMessageStatus() {
	
}