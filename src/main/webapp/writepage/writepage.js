/**
 * 
 */
$("#submitBoard").click(function(event) {
	var board = {
	  title: $("#title").val(),
	  contents: $("#contents").val(),
	  url: $("#url").val()
	}
	ajaxAddBoard(board)
});