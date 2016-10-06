function ajaxBoardList() {
	$.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
		var contents = "";
		var arr = result.data
		for (var i in arr) {
			contents += "<li>" +
            "<a class='titleLink' href='#' data-no='" + arr[i].no + "'>" +
            "<img src='/TeamProject/mainpage/mainpage_images/suji_1.jpg' alt='Image File'>" +
            "<p>" + arr[i].title + "</p>" +
            "</a>" +
            "</li>"
			
		}
		$("#tabs-1 ul").html(contents);
		$(".titleLink").click(function(event){
			$("#myModal").css({"display":"block"});
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
		})
	})
}

function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		
		$("#no").val(result.data.no);
		$("#title").text(result.data.title);
		$("#url").text(result.data.url);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate2);
		$("#like").text(result.data.like);
		$("#viewCount").text(result.data.viewCount);
		$("#writerNick").text(result.data.writerNick);
	})
}
