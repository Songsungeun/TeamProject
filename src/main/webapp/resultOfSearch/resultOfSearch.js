var autosearchValue;
var autosearchValues=[];
$(document).ready(function(){
	autosearchValue = ajaxAutoSearchValue()
	function ajaxAutoSearchValue() {
		var locationPathValue = $(location).attr('pathname');
		var locationPath = locationPathValue.split('/');
		$.getJSON(serverAddr+"/" + locationPath[2] + "/autoSearcher.json", function(obj) {
			var result = obj.jsonResult
			for (var i in result.data.searchValues) {
			autosearchValues.push(result.data.searchValues[i])
			}
		})
	}
})

$(function() {
	$("#inputSearchKey").autocomplete({source: autosearchValues, minlength:2});
});

function ajaxSearchValue(searchValue) {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');
	//var searchInfo = {searchValue: searchValue}

	if (searchValue == "") {
		swal("검색어를 입력해 주세요.", "", "error")
		//location.href ="/TeamProject/mainpage/Main.html"
		return
	} else if (searchValue.length <= 1 ) {
		swal("검색어가 너무 짧아요.", "", "error")
		return
	} else {
		location.href ="/TeamProject/resultOfSearch/resultOfSearchPage.html"
			$.ajax({
				url:serverAddr+"/" + locationPath[2] + "/searchInfo.json",
				type: "GET",
				dataType: "json",
				data: {searchValue : searchValue}, 
				//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
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
var  fileLength = 20;

function ajaxSearchResultList() {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');

	$.getJSON(serverAddr+"/" + locationPath[2] + "/searcher.json",  {
		"boardLength" : boardLength,
		"memberLength":memberLength,
		"fileLength":fileLength,
	}, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패하였습니다.")
			console.log(result.state)
			return
		}
		if (result.data == "") {
		}

		var boardSearchLength = result.data.boardSearchLength //  게시물 총 페이지 수 
		var memberSearchLength = result.data.memberSearchLength // 회원 페이지 수 
		var allFileResult = result.data.allsearchFileResultListLength // 파일 총 갯수
		
		var boardDifference  =  boardSearchLength -  boardLength
		var memberDifference = memberSearchLength -  memberLength

		var nameSearch = "";
		var contentsSearch = "";
		var fileSearch = "";
		var photo =""
	    var data = result.data

			var template1 = Handlebars.compile($('#searchBoardHandlebars').html())
			var template2 = Handlebars.compile($('#searchMemberHandlebars').html())
			var template3 = Handlebars.compile($('#searchFileHandlebars').html())

			contentsSearch += template1(data)
			nameSearch += template2(data)
			fileSearch += template3(data)

		if (memberSearchLength == 0 &&  boardSearchLength == 0 && allFileResult == 0) {
			location.href = "./searchResultNull.html"
		} 
		
		if (memberSearchLength == 0) {
			$("#memberSearchResultWrap").css("display", "none")
		} 
		
		if (boardSearchLength == 0) {
			$("#contentsSearchWrap").css("display", "none") 
		} 
		
		if (allFileResult == 0) {
			$("#fileSearchResult").css("display","none")
		}

		if  (boardSearchLength > 0 &&  boardSearchLength < boardLength) {
			$("#moreViewBtn2").css("display", "none")
		} else if  (memberSearchLength > 0 &&  memberSearchLength < memberLength) {
			$("#moreViewBtn1").css("display", "none")
		} else if (allFileResult > 0 && allFileResult < fileLength) {
		    $("#moreViewBtn3").css("display", "none")
		}

		$("#searchWord").text(data.searchValue);
		$(".memberSearchResult").html(nameSearch);
		$(".contentsSearchResult").html(contentsSearch);
		$("#boardTable tbody").html(fileSearch);
		$("#uSearchLength").text(data.memberSearchLength);
		$("#pSearchLength").text(data.boardSearchLength);
		$("#fSearchLength").text(data.allsearchFileResultListLength);

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

		
		$("#moreViewBtn3").click(function () {
		fileLength += 20;
		ajaxSearchResultList()
			if(fileLength >= allFileResult) {
				$("#moreViewBtn3").css("display", "none")
			}
		})
		
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			var no = $(this).attr("data-no")
			ajaxLoadBoard(no)
			ajaxPostComentsList(no)
		})
	})
}




