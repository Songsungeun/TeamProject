/**
 * 
 */
var userInfo = getParams();
var userNick = userInfo.nick
$("#userNick").text(userNick);

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
	
	$.ajax({
		url:serverAddr+"/membership/otherUserInfoDetail.json",
		type: "GET",
		dataType: "json",
		data: {nickname:userInfo.nick},
		//	  {vo객체 프라퍼티명 : 데이터}
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success"){
				alert("조회 실패!")
				return
			}
			$("#userProfilePhotos").attr('src',"/TeamProject/upload/"+result.data.profilePhoto)
			$("#viewCount").text(result.data.totalViewCount)
			$("#followers").text(result.data.totalFollowers)
			
			var template1 = Handlebars.compile($('#liTemplateText').html())
		$(".tabs-1-contents").html(template1(result));
		$(".titleLink").click(function(event){
			$("#yourModal").modal();
			$("html").css({"overflow":"hidden"});
			 var no = $(this).attr("data-no")
			console.log(boardInfo.no)
			ajaxLoadBoard(boardInfo.no);
			ajaxPostComentsList(boardInfo.no)
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
		},
		error: function(result) {
			console.log(result.state)
		}
	})
}





