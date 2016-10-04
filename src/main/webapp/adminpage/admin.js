function ajaxBoardList() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4)
      return;
    
    if (xhr.status != 200) {
      alert("서버에 잘못 요청했습니다.")
      return;
    }
    var result = JSON.parse(xhr.responseText)
    
    if (result.state != "success") {
      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
      return
    }
    
    var contents = "";
    var arr = result.data
    for (var i in arr) {
    	  contents += "<tr>" +
          "<td>" + arr[i].no + "</td>" + 
          "<td>" + arr[i].title + "</td>" +
          "<td>" + arr[i].createdDate2 + "</td>" +
          "<td>" + arr[i].like + "</td>" + 
          "<td>" + arr[i].viewCount + "</td>" +
          "</tr>"
    }
    
    document.querySelector("#boardTable tbody").innerHTML = contents;
  
    /*  document.querySelector("#tabs-1 ul").innerHTML = contents;
    var aTags = document.querySelectorAll(".titleLink")
    for (var i = 0; i < aTags.length; i++) {
      aTags[i].onclick = function(event) {
        //alert(this.getAttribute("data-no"))
        window.location.href = "BoardDetail.html?no=" + this.getAttribute("data-no")
      }
    } */
 
  }
  
  xhr.open("GET", "../admin/list.json", true)
  xhr.send()
}


$( function() {
  $( "#DetailPage_Wrap" ).tabs();
} );
