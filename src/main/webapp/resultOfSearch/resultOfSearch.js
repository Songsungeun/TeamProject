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
var temp2;
function ajaxSearchResultList() {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');
	
	  $.getJSON(serverAddr+"/" + locationPath[2] + "/searcher.json", 
			  {"searchValue":searchValue,"searchMemberResult":searchMemberResult,
   		       "searchBoardResult":searchBoardResult,"temp2":temp2},
	  function(obj) {
	  var result = obj.jsonResult
	    if (result.state != "success") {
	      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
	      		console.log(result.state)
	      return
	    }
	    if (result.data == "") {
	    	alert("검색 결과가 없습니다.")
	    }
	  
	    var nameSearch = "";
	    var contentsSearch = "";
	    var contents =""
	    var data = result.data

	    var template1 = Handlebars.compile($('#searchBoardHandbars').html())
	    var template2 = Handlebars.compile($('#searchMemberHandlebars').html())
	
	    contentsSearch += template1(data)
	    nameSearch += template2(data)
	  
	   $("#searchWord").text(data.searchValue);
	   $(".memberSearchResult").html(nameSearch);
	   for (var i  in data.temp2) {
			  var aa = $("#searchPhotoPrint").attr('src',"/TeamProject/upload/" + data.temp2[i])
		   }
	   $(".contentsSearchResult").html(contentsSearch);
	
	   
	})	   
	
}	
