/**
 * 
 */
$("#submitBoard").click(function(event) {
	var board = {
	  title: $("#title").val(),
	  contents: $("#contents").val(),
	  url: $("#url").val()
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
	    window.location.href = "test.html"
	}, "json")
}