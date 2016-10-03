function ajaxLoadBoard(no) {
	$.getJSON("detail.json?no=" + no, function(result) {
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		$("#no").val(result.data.no);
		$("#title").val(result.data.title);
		$("#url").val(result.data.url);
		$("#contents").val(result.data.contents);
		$("#createdDate").text(result.data.createdDate2);
		$("#like").text(result.data.like);
		$("#viewCount").text(result.data.viewCount);
	})
}