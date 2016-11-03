/**
 * 
 */


$("#preview").click(function(evnet) {
		var urlinfo = $("#url").val()
		var title = $("#write_title").val();
		var contents = $(".nicEdit-main").html();
		var urlLink = $("#write_youtube").val();
	ajaxViewBoard(urlinfo, title, contents, urlLink);
})

$("#submitBoard").click(function(event) {
	
var formData = new FormData();
	
	formData.append("url", $("#url").val());
	formData.append("title", $("#write_title").val())
	formData.append("contents", $(".nicEdit-main").html());
	formData.append("categoryNo", $("#category").val());
	
	$($("#InputFile")[0].files).each(function(index, file) {
		formData.append("files", file)
	});
	console.log("함수 호출전: " + formData.get("url"));
	console.log("함수 호출전: " + formData.get("title"));
	console.log("함수 호출전: " + formData.get("contents"));
	console.log("함수 호출전: " + formData.get("categoryNo"));
	
	ajaxAddBoard(formData);
});

$("#updateBoard").click(function(event) {
	var board = {
			url: $("#url").val(),
			title: $('#title').val(),
			contents: $("#contents").val(),
			password: $("#password").val(),
			no: $("#no").val()
	}
	ajaxUpdateBoard(board);
})

$("#deleteBoard").click(function(event) {
  ajaxDeleteBoard($("#no").val())
});

function ajaxAddBoard(formData) {
	
	console.log("함수 호출후: " + formData.get("title"));
	console.log("함수 호출후: " + formData.get("contents"));
	console.log("함수 호출후: " + formData.get("categoryNo"));
	
	$.ajax({
		url: "writeadd.json",
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		 success : function(obj) {
			   var result = obj.jsonResult
			   if (result.state != "success") {
			    console.log(result.data)
			    alert("등 실패입니다.")
			    return
			   }
			   window.location.reload(true)
			  }
	})
};

function ajaxLoadBoard(no) {

	$.getJSON(serverAddr + "/writepage/detail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		console.log("헤헤");
		console.log(result);
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#url").val(result.data.url);
		$("#title").val(result.data.title);
		$("#contents").val(result.data.contents);
		$("#no").val(result.data.no);
	})
}

function ajaxUpdateBoard(board) {
	$.post(serverAddr + "/writepage/write_update.json", board, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("변경 실패입니다.")
			return
		}
		window.location.href = "../mainpage/Main.html"
	}, "json")
}

function ajaxDeleteBoard(no) {
	$.getJSON(serverAddr + "/writepage/write_delete.json", {
		no: no
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("삭제 실패입니다.")
			return
		}
		alert("삭제되었습니다.")
		location.href = "../mainpage/Main.html"
	},"json")
}



function writeCookie() {
	cookievalue = $("#url").val();
	document.cookie= "linkURL=!" + (cookievalue);
	//window.location.href="/TeamProject/writepage/writepreview.html";
}

function readCookie() {
	var splitURL = new Array();
	splitURL = document.cookie.split('!');
	var linkURL = splitURL[1];
	return linkURL;
}

function ajaxViewBoard(urlinfo, title, contents, urlLink) {
	console.log("title= " + title);
	console.log("contents= " + contents);
	console.log("urlInfo= " + urlinfo);
		if (!urlinfo) {
			//$(".previewbox").css('display', none);
			$("#previewTitle").text(title);
			$("#previewTextBox").html(contents);
		} else {
			$.getJSON(serverAddr + "/writepage/previewlist.json" , 
					{urlinfo: urlinfo},
					function(textStatus) {
						var result = textStatus.jsonResult
						console.log(result.data);
						console.log(result.state);
						console.log("type: " + typeof urlinfo);
						if (result.state == "error") {
							alert("미리보기가 안되요")
							return;
						} else if (result.state == "fail"){
							$(".form-group2.css").css('display', none);
						} else {
							console.log("title= " + result.data.title);
							$("#urlTitle").html(result.data.title);
							console.log("image= " + result.data.image);
							$("#urlImage").html(result.data.image);
							console.log("desc= " + result.data.description);
							$("#urlDesc").html(result.data.description)
							console.log("URL= " + result.data.detailUrl);
							console.log("SimpleURL = " + result.data.urlAddr);
							$("#urlAddr").html(result.data.urlAddr);
							$("#previewTitle").text(title);
							$("#previewTextBox").html(contents);
						}
					},"json")
		}
}
