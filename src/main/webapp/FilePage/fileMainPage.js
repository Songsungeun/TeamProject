var pageNo = 1,
	  pageLength = 6;

function ajaxFileList() {
	
	$.getJSON(serverAddr + "/FilePage/getFileList.json",  function(obj) {
	var result = obj.jsonResult
    if (result.state != "success") {
      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
      return
    }
	
	var data = result.data
	var totalsize = data.totalPage;
	var boardUiTemplate = Handlebars.compile($('#boardUiTemplateText').html())
   			
    $("#boardTable tbody").html(boardUiTemplate(data));			

//    $(".titleLink").click(function(event) {
//    	window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
    	
        if (pageLength >  totalsize) {
      	$('.moreViewBtn').css("display", "none")
      } 
    $(document.body).on('click', '.btn-danger',  function(event) {
    	var rNumber = $(this).attr("data-no")
    	var result = confirm("게시물을 삭제하시겠습니까?\n삭제한 게시물은 복구 불가능합니다.");
    	if(result) {
    		// 확인 버튼 누를시 
    		//ajaxDeleteBoard(rNumber)
    		alert("확인버튼");
    	} else {
    		//취소 버튼 누를시 
    	}
    });
  })
}


