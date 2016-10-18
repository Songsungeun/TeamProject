/**
 * 
 */
function ajaxSearchValue(searchValue) {
	var locationPathValue = $(location).attr('pathname');
	var locationPath = locationPathValue.split('/');
	
	var searchInfo = {search: searchValue}
	$.ajax({
		url:serverAddr+"/" + locationPath[2] + "/searchInfo.json",
		type: "GET",
		dataType: "json",
		data: searchInfo,
		success: function(obj) {
			console.log(obj.jsonResult)
			var result = obj.jsonResult
			if (result.state != "success"){
				alert("검색 실패!")
				return
			}
		},
		error: function(result) {
			console.log(result.state)
		}
	})
}

function ajaxBoardList() {
	  $.getJSON(serverAddr + "/mainpage/postlist.json", function(obj) {
	  var result = obj.jsonResult
	    if (result.state != "success") {
	      alert("서버에서 데이터를 가져오는데 실패하였습니다.")
	      		console.log(result.state)
	      return
	    }
	  
	    var contents = "";
	    var arr = result.data
	    var template = Handlebars.compile($('#trTemplateText').html())
	        for (var i in arr) {
	          contents += template(arr[i])
	        }
	    $("#ContentSearchResult").html(contents);
	})
}