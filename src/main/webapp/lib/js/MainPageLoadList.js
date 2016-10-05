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
			contents += "<li>" +
            "<a class='titleLink' href='#' data-no='" + arr[i].no + "'>" +
            "<img src='/TeamProject/mainpage/mainpage_images/suji_1.jpg' alt='Image File'>" +
            "<p>" + arr[i].title + "</p>" +
            "</a>" +
            "</li>"
			
		}
		document.querySelector("#tabs-1 ul").innerHTML = contents;
		var aTags = document.querySelectorAll(".titleLink")
		for (var i = 0; i < aTags.length; i++) {
			aTags[i].onclick = function(event) {
				//alert(this.getAttribute("data-no"))
				$("#myModal").css({"display":"block"});
				$(".modal-content p").html('<iframe width="1024" height="700" src="MainPagePostIframe.html?no='+ this.getAttribute("data-no") +'"frameborder="0"></iframe>');
				//window.location.href = "MainPagePostDetail.html?no=" + this.getAttribute("data-no")
ale			}
		}
	}
	
	xhr.open("GET", "postlist.json", true)
	xhr.send() 
}