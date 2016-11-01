function category() { 
	console.log("카테고리1")
	event.stopImmediatePropagation();
	$("#category_tab > li").click(function(event){
		console.log("카테고리1 누름")
		var ctgNo = $(this).attr("data-ctg");
		boardcategoryClick(ctgNo);
//		console.log("ctgNo: " + ctgNo)
//		$("#category_tab > li").removeClass("active");
//		$("#contents-tabs .tab-content").css({"display":"none"});
//		$(this).addClass("active");
//		$("#category_tab-"+ctgNo).css({"display":"block"});
//		if(ctgNo == 0) {
//			console.log("ctgNo= 0 일때");
//			console.log(ctgNo);
//			ajaxBoardList();
//		}
//		if(ctgNo != 0) {
//			console.log("ctgNo= 0 아닐때");
//			console.log(ctgNo);
//			ajaxCategoryIncludeBoardList(ctgNo);
//		}
	});
}

function boardcategoryClick(no){
	console.log("받은 ctgNo : " + no)
	$("#category_tab > li").removeClass("category-active");
	$("#contents-tabs .tab-content").css({"display":"none"});
	$("#category-bar-"+no).addClass("category-active");
	$("#category_tab-"+no).css({"display":"block"});
	if(no == 0) {
		console.log("ctgNo= 0 일때");
		console.log(no);
		ajaxBoardList();
	}
	if(no != 0) {
		console.log("ctgNo= 0 아닐때");
		console.log(no);
		ajaxCategoryIncludeBoardList(no);
	}
}

function ajaxCategoryIncludeBoardList(no) {
	$.getJSON(serverAddr + "/mainpage/selectListandCategory.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		console.log("selectListandCategory 실행");
		var boardTemplate = Handlebars.compile($('#liTemplateText').html())
		$(".tab-content > .category_tab-"+no).html(boardTemplate(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no);
			ajaxLoadBoard(no);
			ajaxPostComentsList(no);
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/ContentsDetail.html?no="+no);
		})
		$(".btn-primary").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/Main.html");
		})
		$(".categoryLink").click(function(event){
			var ctgNo =$(this).attr("data-ctgNo")
			
		})
		$(".userInfoLink").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + $(this).attr("data-userNick");
		})
	})
}

function categorydetailBoard() { 
	console.log("카테고리2")
	event.stopImmediatePropagation();
	$("#category_tab > li").click(function(){
		console.log("카테고리2 누름")
		var ctgNo = $(this).attr("data-ctg");
		detailboardcategoryClick(ctgNo);
//		$("#category_tab > li").removeClass("active");
//		$("#contents-tabs .tab-content").css({"display":"none"});
//		$(this).addClass("active");
//		$("#category_tab-"+ctgNo).css({"display":"block"});
//		if(ctgNo == 0) {
//			console.log("ctgNo= 0 일때");
//			console.log(ctgNo);
//			ajaxDetailBoardList();
//		}
//		if(ctgNo != 0) {
//			console.log("ctgNo= 0 아닐때");
//			console.log(ctgNo);
//			ajaxCategoryIncludeDetailBoardList(ctgNo);
//		}
	});
}

function detailboardcategoryClick(no){
	console.log("받은 ctgNo : " + no)
	$("#category_tab > li").removeClass("category-active");
	$("#contents-tabs .tab-content").css({"display":"none"});
	$(this).addClass("category-active");
	$("#category_tab-"+no).css({"display":"block"});
	if(no == 0) {
		console.log("ctgNo= 0 일때");
		console.log(no);
		ajaxDetailBoardList();
	}
	if(no != 0) {
		console.log("ctgNo= 0 아닐때");
		console.log(no);
		ajaxCategoryIncludeDetailBoardList(no);
	}
}


function ajaxCategoryIncludeDetailBoardList(no) {
	$.getJSON(serverAddr + "/mainpage/selectListandCategory.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패했습니다.")
			return
		}
		console.log("selectListandCategory 실행");
		var detailBoardTemplate = Handlebars.compile($('#detailliTemplateText').html())
		$(".tab-content > .category_tab-"+no).html(detailBoardTemplate(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no);
			ajaxLoadBoard(no);
			ajaxPostComentsList(no);
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/ContentsDetail.html?no="+no);
		})
		$(".btn-primary").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
			window.history.pushState("Changed URI", "", "/TeamProject/mainpage/Main.html");
		})
		$(".categoryLink").click(function(event){
			var ctgNo =$(this).attr("data-ctgNo")
			console.log(ctgNo)
		})
		$(".userInfoLink").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + $(this).attr("data-userNick");
		})
	})
}