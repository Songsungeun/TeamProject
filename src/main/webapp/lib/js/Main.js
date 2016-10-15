$(document).ready(function(){
    $("#myCarousel").carousel();
    $(".item1").click(function(){$("#myCarousel").carousel(0);});
    $(".item2").click(function(){$("#myCarousel").carousel(1);});
    $(".item3").click(function(){$("#myCarousel").carousel(2);});
    $(".item4").click(function(){$("#myCarousel").carousel(3);});
    $(".left").click(function(){$("#myCarousel").carousel("prev");});
    $(".right").click(function(){$("#myCarousel").carousel("next");});
	$(function () {
		$("#tabs >ul >li >a").click(function(){
			$("#tabs >ul >li >a").removeClass("on");
			$("#tabs .conts_inner").css({"display":"none"});
			$(this).addClass("on");
			$("#tabs #tabs-"+($("#tabs >ul >li >a").index(this)+1)).css({"display":"block"});
		});
	});
	$(function() {
		$("#includedContent").load("/TeamProject/header.html");
	});
	$(function () {
		$("#pop_tabs >ul >li >a").click(function(){
			$("#pop_tabs >ul >li >a").removeClass("on1");
			$("#pop_tabs .pop_cont_in").css({"display":"none"});
			$(this).addClass("on1");
			$("#pop_tabs #pop_tabs-"+($("#pop_tabs >ul >li >a").index(this)+1)).css({"display":"block"});
		});
	});
});
function ajaxBoardList() {
	$.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		var template1 = Handlebars.compile($('#liTemplateText').html())
		$("#tabs-1 > .tabs-1-contents").html(template1(result));
		$(".titleLink").click(function(event){
			$("#myModal").css({"display":"block"});
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
		})
		$("#close-Btn").click(function() {
			$("#myModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
		})
		
	})
}
function ajaxBoardPopList() {
	$.getJSON(serverAddr + "/mainpage/mostPost.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		console.log("PopList 실행")
		var contents = ""
	    var arr = result.data
	    for (var i in arr) {
	    	contents += "<li class='pop_list'>" +
	    	"<a class='pop_list_Link' href='#' data-no='" + arr[i].no + "'>" +
	    	"<span class='popNo'>"+ (parseInt(i)+1) +"</span>" +
	    	"<span class='popConts'>" + arr[i].title +"</span>" +
	    	"</a>" +
	    	"</li>"
	    }
	    $("#pop_tabs-1 > .pop_tabs-1-conts").html(contents)
	    $(".pop_list_Link").click(function(event){
			$("#myModal").css({"display":"block"});
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			console.log(no)
			ajaxLoadBoard(no)
		})
		
		$("#close-Btn").click(function() {
			$("#myModal").css({"display":"none"});
			$("#super_HTML").css({"overflow":"auto"});
		})
    })
}
function ajaxLoadBoard(no) {
	$.getJSON(serverAddr + "/mainpage/postdetail.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("조회 실패입니다.")
			return
		}
		$("#no").val(result.data.no);
		$("#title").text(result.data.title);
		$("#url").text(result.data.url);
		$("#contents").text(result.data.contents);
		$("#createdDate").text(result.data.createdDate2);
		$("#writerNick").text(result.data.writerNick);
		$("#url_location").html(result.data.linkTitle);
		$("#viewCount").text(result.data.viewCount);
		$("#like").text(result.data.like);
		
		$("#lkBtn").click(function(){
			if (!$("#lk"))
				
			$("#lkBtn").removeClass("lk");
			$("#lkBtn").css({"display":"none"});
			$(this).addClass("lk");
			$("#pop_tabs #pop_tabs-"+($("#pop_tabs >ul >li >a").index(this)+1)).css({"display":"block"});
		})
		$(".post_url > #url").click(function(event) {
			event.preventDefault();
				console.log("url 눌림");
				console.log(result.data.url);
	//			location.href = result.data.url;
//				window.open(result.data.url);
		})
		
	})	
}
window.onclick = function(event) {
var htmlTag = document.getElementById('super_HTML');
var modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = "none";
    htmlTag.style.overflow = "auto";
  }
}