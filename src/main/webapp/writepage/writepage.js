/**
 * 
 */
$("#submitBoard").click(function(event) {
	var board = {
	  url: $("#url").val(),
	  title: $("#title").val(),
	  contents: $("#contents").val()
	}
	console.log(board)
	ajaxAddBoard(board)
});

function ajaxAddBoard(board) {
	$.post("add.json", board, function(result) {
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    }
	    window.location.href = "../mainpage/Main.html"
	}, "json")
}

function ajaxLoadBoard(no) {
	$.getJSON("detail.json?no=" + no, function(result) {
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#url").val(result.data.url);
		$("#title").val(result.data.title);
		$("#contents").val(result.data.contents);
	})
}