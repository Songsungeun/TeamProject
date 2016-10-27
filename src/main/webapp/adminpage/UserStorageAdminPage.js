
function ajaxBoardList() {
	
	$.getJSON(serverAddr + "/admin/adminlist.json", function(obj) {
	var result = obj.jsonResult
    if (result.state != "success") {
      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
      return
    }
	
    var contents = "";
    var arr = result.data
    var template = Handlebars.compile($('#trTemplateText').html())
    		for (var i in arr) {
    			contents += template(arr[i])
    		}
    $("#boardTable tbody").html(contents);
    $(".titleLink").click(function(event) {
    	window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
    })
    
    $(document.body).on('click', '.btn-danger',  function(event) {
    	var result = confirm("게시물을 삭제하시겠습니까?\n삭제한 게시물은 복구 불가능합니다.");
    	if(result) {
    		// 확인 버튼 누를시 
    		ajaxDeleteBoard(arr[i].no)
    	} else {
    		//취소 버튼 누를시 
    	}
    });
    
  })
}

function ajaxDeleteBoard(no) {
	$.getJSON(serverAddr + "/admin/admindelete.json", {
		no: no}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
		      location.href = "HoneyAdminPage.html"
			return
		}
		alert("삭제되었습니다.")
		location.href = "HoneyAdminPage.html"
	})
}


$(function() {
	    $( "#DetailPage_Wrap" ).tabs();
	 } );


