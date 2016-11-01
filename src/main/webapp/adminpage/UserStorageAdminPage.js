

   $(document.body).on('click', '.moreViewBtn', function(event){
    pageLength += 6;
    ajaxBoardList()
})

var pageNo = 1,
	  pageLength = 6;

function ajaxBoardList() {
	
	$.getJSON(serverAddr + "/admin/adminPostlist.json", {
		"pageNo" : pageNo,
		"length" : pageLength,
	},  function(obj) {
	var result = obj.jsonResult
    if (result.state != "success") {
      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
      return
    }
	
	var data = result.data
	var totalsize = data.totalPage;
	var boardUiTemplate = Handlebars.compile($('#boardUiTemplateText').html())
    var cardUiTemplate = Handlebars.compile($('#cardUiTemplateText').html())
   			
    $("#boardTable tbody").html(boardUiTemplate(data));			
    $("#postsCard").html(cardUiTemplate(data));

    $(".titleLink").click(function(event) {
    	window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
    })
        if (pageLength >  totalsize) {
      	$('.moreViewBtn').css("display", "none")
      } 
    
    $(document.body).on('click', '.btn-danger',  function(event) {
    	var rNumber = $(this).attr("data-no")
    	var result = confirm("게시물을 삭제하시겠습니까?\n삭제한 게시물은 복구 불가능합니다.");
    	if(result) {
    		// 확인 버튼 누를시 
    		ajaxDeleteBoard(rNumber)
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
		    window.location.reload();
			return
		}
		alert("삭제되었습니다.")
		window.location.reload();
	})
}


  $(".conterDetailBtn1").click(function () {
  		   if($("#tableWrap").css("display") != "none"){   
  		        $('#tableWrap').hide();
  		        $('#cardWrap').show();  
  }});
  
  $(".conterDetailBtn2").click(function () {
          	 $('#cardWrap').hide();  
             $('#tableWrap').show();  
  });



