/**
 * 
 */


$("#preview").click(function(evnet) {
		var urlinfo = $("#url").val()
		var title = $("#write_title").val();
		var contents = $(".nicEdit-main").html();
	ajaxViewBoard(urlinfo, title, contents);
})

$("#fileButton").click(function() {
	$("#fileupload").click()
});

$("#submitBoard").click(function(event) {
	var saveCon = nicEditorInstance.saveContent;
	var categoryNo = $("#category").val()
	switch (categoryNo) {
	case "라이프" : categoryNo = 1
		break;
	case "스포츠" : categoryNo = 2
	break;
	case "차/테크" : categoryNo = 3
	break;
	case "패션/뷰티" : categoryNo = 4
	break;
	case "게임" : categoryNo = 5
	break;
	case "TV/연예" : categoryNo = 6
	break;
	case "뮤직" : categoryNo = 7
	break;
	case "영화" : categoryNo = 8
	break;
	case "책/문화" : categoryNo = 9
	break;
	case "지식/교양" : categoryNo = 10
	break;
	default : categoryNo = 0
	break;
	}
	var board = {
				url: $("#url").val(),
				title: $("#write_title").val(),
				contents: $(".nicEdit-main").html(),
				userNo:$("#memberNumber").val(),
				fileName:$("#hiddenFileName").text(),
				originFileName:$("#hiddenOriginFileName").text(),
				categoryNo
	
	}
	console.log(board);
	ajaxAddBoard(board);
	
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

//$(function () {
//	console.log("업로드를 시작하지");
//    $('#uploadForm').fileupload({
//    	url : serverAddr + "/writepage/boardFileUpload.json", 
//        dataType: 'json',
//        type: 'POST',
//        add: function(e, data){
//        	console.log("log");
//            var uploadFile = data.files[0];
//            var isValid = true;
//            if (!(/png|jpe?g|gif/i).test(uploadFile.name)) {
//                alert('png, jpg, gif 만 가능합니다');
//                isValid = false;
//            } else if (uploadFile.size > 10000000) { // 5mb
//                alert('파일 용량은 10메가를 초과할 수 없습니다.');
//                isValid = false;
//            }
//            if (isValid) {
//                data.submit();              
//            }
//        }, done: function (e, data) {
//            var code = data.result.code;
//            var msg = data.result.msg;
//            if(code == '1') {
//                alert(msg);
//                $("#hiddenFileName").text(data.result.fileName);
//            } else {
//                alert(code + ' : ' + msg);
//            } 
//        }, fail: function(e, data){
//            alert('서버와 통신 중 문제가 발생했습니다');
//            foo = data;
//        }
//    });
//})

$(document).ready(function() {
    $('#fileupload').fileupload({
        url : serverAddr + "/writepage/boardFileUpload.json", 
        dataType: 'json',
        add: function(e, data){
                data.submit();              
        }, done: function (e, data) {
        	console.log("obj.jsonResult.data= " + data.result.filename);
        	$("#hiddenFileName").text(data.result.filename);
        	$("#hiddenOriginFileName").text(data.result.originalFileName);
        	$("#originFile").text(data.result.originalFileName);
        }, fail: function(e, data){
            alert('서버와 통신 중 문제가 발생했습니다');
        }
        
        
    });
}); 

function ajaxAddBoard(board) {
	console.log("add")
	$.post(serverAddr + "/writepage/writeadd.json", board, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("등록 실패입니다.")
	    	 return
	    }
	}, "json")
	
	console.log("add end")
}

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

function ajaxViewBoard(urlinfo, title, contents) {
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


