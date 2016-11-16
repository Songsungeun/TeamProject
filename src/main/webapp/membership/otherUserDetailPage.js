/**
 * 
 */
var userInfo = getParams();
var userNick = userInfo.nick
$("#userNick").text(userNick);



$("#files").click(function(event){
	$("#posts").css("color","#99999")
	$("#files").css("color","#db2626")
	$("#post_wrapper").css("display","none")
	$("#userFilesWrap").css("display","block")
})

$("#posts").click(function(event){
	$("#files").css("color","#99999")
	$("#posts").css("color","#db2626")
	$("#userFilesWrap").css("display","none")
	$("#post_wrapper").css("display","block")
})




function getParams() {
	var param = new Array();
	var url = decodeURIComponent(location.href);
	url = decodeURIComponent(url);
	var params = url.substring( url.indexOf('?')+1, url.length );
	params = params.split("#");
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
			var imgSrc = result.data.profilePhoto
			var splitImgSrc = imgSrc.split(".")
			if(splitImgSrc.length == 2) {
			$("#userPhoto").attr('src',"/TeamProject/upload/"+splitImgSrc[0] + "." + splitImgSrc[1])
			} else {
				$("#userPhoto").attr('src',"http://graph.facebook.com/"+splitImgSrc[0] + "/picture")
			}
			$("#viewCount").text(result.data.totalViewCount)
			$("#likeCount").text(result.data.totalLikeCount)
			$("#followers").text(result.data.totalFollowers)
			$("#user-introduce").text(result.data.userInfo)
			
			var source = $('#liTemplateText').html();
			var template = Handlebars.compile(source);
			var data = result.data.boardInfo
			data.stringify = JSON.stringify(data);
			var boards = template(data);
			$("#post_wrapper").append(boards);
			
			
			$(".titleLink").click(function(event){
				$("#yourModal").modal();
				$("html").css({"overflow":"hidden"});
				 var no = $(this).attr("data-no")
				ajaxLoadBoard(no);
				ajaxPostComentsList(no)
			})
			
		},
		error: function(result) {
			console.log(result.state)
		}
	})
	
	$.ajax({
		url:serverAddr+"/membership/getFileList2.json",
		type: "GET",
		dataType: "json",
		data: {nickname:userInfo.nick},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(obj) {
			var result = obj.jsonResult
			if (result.state != "success"){
				alert("조회 실패!")
				return
			}
			var listInject = result.data
			var template = Handlebars.compile($("#fileTableUiTemplateText").html())
			$("#fileResultList").html(template(listInject))
			$("#testBtn").click(function(){
				console.log(listInject)
			})
			
		},
		error: function(result) {
			console.log(result.state)
		}
	})

}





