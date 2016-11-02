/**
 * 
 */
var userInfo = getParams();
console.log(userInfo.nick)
function getParams() {
	var param = new Array();
	var url = decodeURIComponent(location.href);
	url = decodeURIComponent(url);
	var params = url.substring( url.indexOf('?')+1, url.length );
	params = params.split("&");
	var size = params.length;
	var key, value;
	for(var i=0 ; i < size ; i++) {
		key = params[i].split("=")[0];
		value = params[i].split("=")[1];

		param[key] = value;
	}
	return param;
}

aJaxOtherUserProfileLoder(userInfo);

function aJaxOtherUserProfileLoder(userInfo) {
	console.log(userInfo)
	$.ajax({
		url:serverAddr+"/membership/otherUserInfoDetail.json",
		type: "GET",
		dataType: "json",
		data: {nickname:userInfo.nick},
		//		{vo객체 프라퍼티명 : 데이터}
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success"){
				alert("조회 실패!")
				return
			}
		},
		error: function(result) {
			console.log(result.state)
		}
	})
}






