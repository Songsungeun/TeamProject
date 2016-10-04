function ajaxBoardList() {
	$.getJSON("adminlist.json")
  
    
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
          "</tr>"
    }
    
    $("#boardTable tbody").html = contents;
    $(".titleLink").click(function(event) {
    	window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
    })
   
}


$( function() {
  $( "#DetailPage_Wrap" ).tabs();
} );
