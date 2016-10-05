function ajaxBoardList() {
	$.getJSON("../admin/adminlist.json", function(result) {
    if (result.state != "success") {
      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
      return
    }
    
    var contents = "";
    var arr = result.data
    for (var i in arr) {
    	  contents += "<tr>" +
          "<td>" + arr[i].no + "</td>" + 
          "<td><a class='titleLink' href='#' data-no='" + arr[i].no + "'>" + arr[i].title + "</a></td>" +
          "<td>" + arr[i].createdDate2 + "</td>" +
          "<td>" + arr[i].like + "</td>" + 
          "<td>" + arr[i].viewCount + "</td>" +
          "<td>" + "<button type='button' id='boardDelete' class='btn btn-danger'>삭제</button>" + "</td>"
          "</tr>"
    }
    
    $("#boardTable tbody").html(contents);
    $(".titleLink").click(function(event) {
    	window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
    })
    
    $(".btn-danger").click(function(event){
    	 var result = confirm("게시물을 삭제하시겠습니까?\n삭제한 게시물은 복구 불가능합니다.");
         if(result) {
        	 ajaxDeleteBoard(arr[i].no)
         } else {
            
         }
    });
    
  })
}

$( function() {
   $( "#DetailPage_Wrap" ).tabs();
} );


function ajaxDeleteBoard(no) {
	$.getJSON("../admin/admindelete.json", {
		no: no
	}, function(result) {
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		alert("삭제되었습니다.")
		location.href = "HoneyAdminPage.html"
	})
}