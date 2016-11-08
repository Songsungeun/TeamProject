

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

//    $(".titleLink").click(function(event) {
//    	window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 
    	
    	$(".titleLink").click(function(event){
		$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			 var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
			ajaxPostComentsList(no)
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
  			   $("#layoutBtn").attr("src", "./images/layout-2.svg")
  			    $("#listBtn").attr("src", "./images/list-1.svg")
  		        $('#tableWrap').hide();
  		        $('#cardWrap').show();  
  }});
  
  $(".conterDetailBtn2").click(function () {
	   $("#layoutBtn").attr("src", "./images/layout-1.svg")
		    $("#listBtn").attr("src", "./images/list-2.svg")
          	 $('#cardWrap').hide();  
             $('#tableWrap').show();  
  });

  function ajaxLoadBoard(no) {
		$.getJSON(serverAddr + "/admin/postdetail.json?no=" + no, function(obj) {
			var result = obj.jsonResult
			if (result.state == "fail" || result.state == "error") {
				alert("조회 실패입니다.")
				return
			} else if (result.state == "success"){
				// 기존 영역 초기화 시작
				$("#no").val("");
				comentInfo =result.data.board.no;
				$("#userTitle").text("");
				$("#url").text("");
				$("#userDesc").html("");
				$("#url_location").html("");
				$("#fileListArea").text("");
				$("#linkTitle").text("");
				$("#linkDesc").text("");
				$("#linkURL").text("");
				$("#urlImage").html("");
				$("#fileListArea").html("");
				$("#youtubeUrl").attr("src","");
				// 기존 영역 초기화 완료
				$("#no").val(result.data.board.no);
				comentInfo =result.data.board.no;
				$("#userTitle").text(result.data.board.title);
				$("#url").text(result.data.board.url);
				$("#userImage").attr("src", "/TeamProject/upload/" + result.data.board.userProfilePath);
				$("#userDesc").html(result.data.board.contents);
				$("#createdDate").text(result.data.board.createdDate2);
				$("#writerNick").text(result.data.board.writerNick);
				$("#url_location").html(result.data.board.linkTitle);
				$("#post_user_id").text(result.data.board.email);
				$("#viewCount").text(result.data.board.viewCount);
				$("#like").text(result.data.board.like);
				$("#fileListArea").text(result.data.fileList.originalFileName);
				if (result.data.urlInfo.title != null) {
					$("#linkTitle").text(result.data.urlInfo.title);
					$("#linkDesc").text(result.data.urlInfo.description);
					$("#linkURL").text(result.data.urlInfo.urlAddr);
					$("#urlImage").html(result.data.urlInfo.image);
					$(".linkText").css('display','block');
				} else {
					$(".linkText").css('display','none');
				}
				if (result.data.fileList.length > 0) {
					for (var i = 0; i < result.data.fileList.length; i++) {
						fileList += "<a id='fileListArea'" +"href='http://t2.java85.com:8080/TeamProject/upload/" 
						+ result.data.fileList[i].fileName + "' download='" + result.data.fileList[i].originalFileName + "'>"
						+ (i+1) + "." + result.data.fileList[i].originalFileName + "</div>"
					}
					$("#fileListArea").html(fileList);
					$(".fileArea").css('display','block');
				} else {
					$(".fileArea").css('display','none');
				}
				
				if (result.data.board.youtubeURL != null) {
					$("#youtubeUrl").attr("src","https://www.youtube.com/embed/" + result.data.board.youtubeURL);
					$(".youtubeArea").css('display','block');
				} else if (result.data.board.youtubeURL == null){
					$(".youtubeArea").css('display','none');
				}
			}	
			$("#writerNick").click(function(event) {
				window.location.href = "../../UserStorageAdminPage.html"
			})
			$(".owner_img").click(function(event) {
				window.location.href = "../../UserStorageAdminPage.html"
			})
		})
	}
  function ajaxPostComentsList(no) {
		$.getJSON(serverAddr + "/mainpage/comentList.json?no=" + no, function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				alert("서버에서 데이터를 가져오는데 실패했습니다.")
				return
			}
			var contents = ""
				var arr = result.data.comentList
				for (var i=0; i < arr.length; i++) {
					if(result.data.LoginInfo == arr[i].memberNo) {
						contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
						"<div class='coment_info'>" +
						"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
						"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
						"<div class='coment_ud'>" +
						"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
						"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
						"<div class='replyArea'></div>" +
						"<div class='cmt-btn-wrap'>" +
						"<a class='cmt_update' type='button' data-update='" + arr[i].cmtNo + "'>수정</a>" +
						"<a class='cmt_delete' type='button' data-Delete='" + arr[i].cmtNo + 
						"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
						"</div>" + "</div>" + "</div>"
					} 
					if(result.data.LoginInfo != arr[i].memberNo || result.data.LoginInfo == 0){
						contents += "<div class='coment_wrap' id='depth" + arr[i].comentDepth + "' data-cmtNo='" + arr[i].cmtNo +"'>" +
						"<div class='coment_info'>" +
						"<a class='cmt_userNick' href='#' data-no='" + arr[i].memberNo + "'>" + arr[i].writerNick + "</a>" +
						"<span class='cmt_conts' data-cmtarea='" + arr[i].cmtNo + "'>" + arr[i].coment + "</span>" + "</div>" +
						"<div class='coment_ud'>" +
						"<span class='cmt_createdDate'>" + arr[i].createdDate2 + "</span>" +
						"<a class='cmt_reply' href='#' data-no='" + arr[i].cmtNo + "'>답글달기</a>" +
						"<div class='replyArea'></div>" +
						"<div class='cmt-btn-wrap'>" +
						"<a class='cmt_update' type='button' style='display:none' data-update='" + arr[i].cmtNo + "'>수정</a>" +
						"<a class='cmt_delete' type='button' style='display:none' data-Delete='" + arr[i].cmtNo +
						"' data-depth='" + arr[i].comentDepth + "'>삭제</a>" +
						"</div>" + "</div>" + "</div>"
					}
				}
			$(".userComment > .cmts_list").html(contents);
			console.log(result.data.LoginInfo)
		})
	}
