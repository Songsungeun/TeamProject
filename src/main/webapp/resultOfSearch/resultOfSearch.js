/**
 * 
 */



function ajaxSearchValue(searchValue) {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');
	var searchInfo = {searchValue: searchValue}
	
	if (searchInfo.searchValue == "") {
		alert("검색어를 입력하세요")
		//location.href ="/TeamProject/mainpage/Main.html"
		return
	} else if (searchInfo.searchValue.length <= 1 ) {
		alert("검색어가 너무 짧습니다.")
		return
	} else {
		location.href ="/TeamProject/resultOfSearch/resultOfSearchPage.html"
	$.ajax({
		url:serverAddr+"/" + locationPath[2] + "/searchInfo.json",
		type: "GET",
		dataType: "json",
		data: searchInfo, 
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success"){
				alert("검색 실패!")
				return
			}
		},
		error: function(result) {
			console.log(result.state)
		}
	})}
}

var searchValue;
var searchMemberResult;
var searchBoardResult;
var memberPhotoExtract;
var  boardLength = 6;
var  memberLength = 4;

function ajaxSearchResultList() {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');
	
	  $.getJSON(serverAddr+"/" + locationPath[2] + "/searcher.json",  {
		  "boardLength" : boardLength,
		  "memberLength":memberLength
	  }, function(obj) {
	  var result = obj.jsonResult
	    if (result.state != "success") {
	      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
	      		console.log(result.state)
	      return
	    }
	    if (result.data == "") {
	    	alert("검색 결과가 없습니다.")
	    }
	    
		var boardSearchLength = result.data.boardSearchLength //  게시물 총 페이지 수 
		var memberSearchLength = result.data.memberSearchLength // 회원 페이지 수 
		var boardDifference  =  boardSearchLength -  boardLength
		var memberDifference = memberSearchLength -  memberLength
	    
	    var nameSearch = "";
	    var contentsSearch = "";
	    var photo =""
	    var data = result.data

	    var template1 = Handlebars.compile($('#searchBoardHandbars').html())
	    var template2 = Handlebars.compile($('#searchMemberHandlebars').html())
	
	    contentsSearch += template1(data)
	    nameSearch += template2(data)
	    
	   if  (boardSearchLength == 0  &&  memberSearchLength == 0 ) {
	    	location.href ="/TeamProject/resultOfSearch/searchResultNull.html"

	   } else  if (memberSearchLength == 0) {
	    	$("#memberSearchResultWrap").css("display", "none")
	   } else  if (boardSearchLength == 0) {
	    	$("#contentsSearchWrap").css("display", "none") 
	    }
	    
	   if  (boardSearchLength > 0 &&  boardSearchLength < boardLength) {
		 $("#moreViewBtn2").css("display", "none")
	    } else if  (memberSearchLength > 0 &&  memberSearchLength < memberLength) {
	    	 $("#moreViewBtn1").css("display", "none")
	    }
 
	   $("#searchWord").text(data.searchValue);
	   $(".memberSearchResult").html(nameSearch);
	   $(".contentsSearchResult").html(contentsSearch);
	   $("#uSearchLength").text(data.memberSearchLength);
	   $("#pSearchLength").text(data.boardSearchLength);
	   
	   $("#moreViewBtn1").click(function () {
		   memberLength += Number(memberDifference);
		   ajaxSearchResultList()
		   if (memberLength ==  memberSearchLength )
			   $("#moreViewBtn1").css("display", "none")
	   })
	   
	   $("#moreViewBtn2").click(function () {
		   boardLength += Number(boardDifference);
		   ajaxSearchResultList()
		   if (boardLength ==  boardSearchLength )
		     $("#moreViewBtn2").css("display", "none")
	   })
	 
	  })
}
	   
