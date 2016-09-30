   
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
    var contents = ""
    var arr = result.data
    for (var i in arr) {   	
    	contents += 
    	  "<li>" + arr[i].title + "<br>" +
    	  "<a href='hyoju.jpg'>" + 
    	  "<img alt='Image File'>" +
          "<p>" + "Thumbnail Text" + "</p>" +
         "</a>" + "</li>"
    }
    document.querySelector(".conts_inner").innerHTML = contents;
    
  }  
  xhr.open("GET", "../honey/list.json", true)
  xhr.send() 
}

