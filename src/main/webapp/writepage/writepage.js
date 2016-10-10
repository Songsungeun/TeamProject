/**
 * 
 */
$("#submitBoard").click(function(event) {
	var categoryNo = $("#category").val()
	switch (categoryNo) {
	case "라이프" : categoryNo = 2
		break;
	case "스포츠" : categoryNo = 3
	break;
	case "차/테크" : categoryNo = 4
	break;
	case "패션/뷰티" : categoryNo = 5
	break;
	case "게임" : categoryNo = 6
	break;
	case "TV/연예" : categoryNo = 7
	break;
	case "뮤직" : categoryNo = 8
	break;
	case "영화" : categoryNo = 9
	break;
	case "책/문화" : categoryNo = 10
	break;
	case "지식/교양" : categoryNo = 11
	break;
	default : categoryNo = 1
	break;
	}
	
	var board = {
	  url: $("#url").val(),
	  title: $("#title").val(),
	  contents: $("#contents").val(),
	  userNo:$("#memberNumber").val(),
	  categoryNo
	}
	console.log(board)
	ajaxAddBoard(board)
});

$("#updateBoard").click(function(event) {
	var board = {
			url: $("#url").val(),
			title: $('#title').val(),
			contents: $("#contents").val(),
			password: $("#password").val(),
			no: $("#no").val()
	}
	ajaxUpdateBoard(board);
})

$("#deleteBoard").click(function(event) {
  ajaxDeleteBoard($("#no").val())
});

function ajaxAddBoard(board) {
	$.post(serverAddr + "/writepage/writeadd.json", board, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    }
	    window.location.href = "../mainpage/Main.html"
	}, "json")
}

function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/writepage/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		console.log("헤헤");
		console.log(result);
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#url").val(result.data.url);
		$("#title").val(result.data.title);
		$("#contents").val(result.data.linkTitle);
		$("#no").val(result.data.no);
		console.log(result.data.linkTitle);
	})
}

function ajaxUpdateBoard(board) {
	$.post(serverAddr + "/writepage/write_update.json", board, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		window.location.href = "../mainpage/Main.html"
	}, "json")
}

function ajaxDeleteBoard(no) {
	$.getJSON(serverAddr + "/writepage/write_delete.json", {
		no: no
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		alert("삭제되었습니다.")
		location.href = "../mainpage/Main.html"
	})
}
