function category() { 
	console.log("카테고리1")
	event.stopImmediatePropagation();
	$("#category_tab > li").click(function(event){
		var ctgNo = $(this).attr("data-ctg");
		console.log("카테고리"+ctgNo+"누름: "+ ctgNo)
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
//		var template11 = Handlebars.compile($('#li1TemplateText').html())
//		$(".category_tab-1-"+no).html(template11(result));
//		var template22 = Handlebars.compile($('#li2TemplateText').html())
//		$(".category_tab-2-"+no).html(template22(result));
//		var template33 = Handlebars.compile($('#li3TemplateText').html())
//		$(".category_tab-3-"+no).html(template33(result));
//		var template44 = Handlebars.compile($('#li4TemplateText').html())
//		$(".category_tab-4-"+no).html(template44(result));
		var list1 = result.data.list1;
		boardLists(list1, 1, no);
		var list2 = result.data.list2;
		boardLists(list2, 2, no);
		var list3 = result.data.list3;
		boardLists(list3, 3, no);
		var list4 = result.data.list4;
		boardLists(list4, 4, no);
//		var boardTemplate = Handlebars.compile($('#liTemplateText').html())
//		$(".tab-content > .category_tab-"+no && ".allConts4").html(boardTemplate(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no);
			ajaxLoadBoard(no);
			ajaxPostComentsList(no);
			window.history.pushState("Changed URI", "", "../mainpage/ContentsDetail.html?no="+no);
		})
		$(".btn-primary").click(function() {
			$("#yourModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
			window.history.pushState("Changed URI", "", "../mainpage/Main.html");
		})
		$(".categoryLink").click(function(event){
			var ctgNo =$(this).attr("data-ctgNo")
			
		})
		$(".userInfoLink").click(function(event) {
			window.location.href = "../membership/otherUserDetailPage.html?nick=" + $(this).attr("data-userNick");
		})
	})
}

//function categorydetailBoard() { 
//	console.log("카테고리2")
//	event.stopImmediatePropagation();
//	$("#category_tab > li").click(function(){
//		console.log("카테고리2 누름")
//		var ctgNo = $(this).attr("data-ctg");
//		detailboardcategoryClick(ctgNo);
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
//	});
//}

//function detailboardcategoryClick(no){
//	console.log("받은 ctgNo : " + no)
//	$("#category_tab > li").removeClass("category-active");
//	$("#contents-tabs .tab-content").css({"display":"none"});
//	$(this).addClass("category-active");
//	$("#category_tab-"+no).css({"display":"block"});
//	if(no == 0) {
//		console.log("ctgNo= 0 일때");
//		console.log(no);
//		ajaxDetailBoardList();
//	}
//	if(no != 0) {
//		console.log("ctgNo= 0 아닐때");
//		console.log(no);
//		ajaxCategoryIncludeDetailBoardList(no);
//	}
//}
//
//
//function ajaxCategoryIncludeDetailBoardList(no) {
//	$.getJSON(serverAddr + "/mainpage/selectListandCategory.json?no=" + no, function(obj) {
//		var result = obj.jsonResult
//		if (result.state != "success") {
//			alert("서버에서 데이터를 가져오는데 실패했습니다.")
//			return
//		}
//		console.log("selectListandCategory 실행");
//		var detailBoardTemplate = Handlebars.compile($('#detailliTemplateText').html())
//		$(".tab-content > .category_tab-"+no).html(detailBoardTemplate(result));
//		$(".titleLink").click(function(event){
//			$("#yourModal").modal();
//			$("html").css({"overflow":"hidden"});
//			var no = $(this).attr("data-no")
//			console.log(no);
//			ajaxLoadBoard(no);
//			ajaxPostComentsList(no);
//			window.history.pushState("Changed URI", "", "../mainpage/ContentsDetail.html?no="+no);
//		})
//		$(".btn-primary").click(function() {
//			$("#yourModal").css({"display":"none"});
//			$("#super_HTML").css({"overflow":"auto"});
//			window.history.pushState("Changed URI", "", "../mainpage/Main.html");
//		})
//		$(".categoryLink").click(function(event){
//			var ctgNo =$(this).attr("data-ctgNo")
//			console.log(ctgNo)
//		})
//		$(".userInfoLink").click(function(event) {
//			window.location.href = "../membership/otherUserDetailPage.html?nick=" + $(this).attr("data-userNick");
//		})
//	})
//}