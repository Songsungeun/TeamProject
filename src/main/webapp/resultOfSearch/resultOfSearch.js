/**
 * 
 */
function ajaxSearchValue(searchValue) {
	console.log(searchValue)
	$.ajax({
		url:serverAddr + "/resultOfSearch/searchInfo.json",
		type: "GET",
		dataType: "json",
		data: searchValue,
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

