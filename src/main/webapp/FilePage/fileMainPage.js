$(document).ready(function() {
	$(function() {
		$("#includedContent").load("/TeamProject/header.html");
	});
	$("#ProfileEditLink").click(function() {
		window.location.href = "../membership/userProfileAdminPage.html"
	});
	$(".profileEdit_Btn").click(function() {
		window.location.href = "../membership/userProfileAdminPage.html"
	});

	$("#TipBoardLink").click(function() {
		window.location.href = "../adminpage/HoneyAdminPage.html"
	});
	$("#StorageLink").click(function() {
		window.location.href = "filepage.html"
	});
	$(".profileEdit_Btn").hover(function() {
		$("#ProfileEditLinkGear").css('-webkit-animation','spin 4s infinite linear')
		$("#ProfileEditLinkGear").css('-o-animation','spin 4s infinite linear')
		$("#ProfileEditLinkGear").css('-moz-animation','spin 4s infinite linear')
		$("#ProfileEditLinkGear").css('animation','spin 4s infinite linear')
	}, function() {
		$("#ProfileEditLinkGear").css('-webkit-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('-moz-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('-ms-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('-o-animation-play-state','paused')
		$("#ProfileEditLinkGear").css('animation-play-state','paused')
	})
	$(".fileAddBtn").click(function (event) {
		$("#yourModal").modal();
	});
	$("input[type=file]").change(function () {
		console.log("파일업로드 함수 실행")
		var fileInput = document.getElementById("fileUpload");
		var files = fileInput.files;
		var file;
		var fileSelect;
		var uploadContents = "";
		var filemame=0;
		var filesize=0;
		var fileFixsize=0;
		for (var i = 0; i < files.length; i++) {
			filemame = $("#fileUpload")[0].files[i].name;
			filesize = $("#fileUpload")[0].files[i].size;
			console.log("파일사이즈= " + filesize);
			if(filesize <= 99999) {
				fileFixsize=(filesize*0.000977).toFixed(2);
				uploadContents += "<div class='EachFilesWrap'>"+
				"<div class='EachFiles' data-no='"+i+"'>"+filemame+"</div>"+
				"<span class='fileSize'>"+fileFixsize+"KB</span>" +
				"</div>"
			} else {
				fileFixsize=(filesize*0.000977*0.000977).toFixed(2);
				uploadContents += "<div class='EachFilesWrap'>"+
				"<div class='EachFiles' data-no='"+i+"'>"+filemame+"</div>"+
				"<span class='fileSize'>"+fileFixsize+"MB</span>" +
				"</div>"
			}
		}
		$("#fileListWrap").html(uploadContents);
	});
});
$("#sendFileBtn").click(function(event) {

	var formData = new FormData();

	$($("#fileUpload")[0].files).each(function(index, file) {
		formData.append("files", file)
	});
	ajaxAddBoard(formData);
});
function ajaxAddBoard(formData) {
	$.ajax({
		url: "writeadd.json",
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		success : function(obj) {
			var result = obj.jsonResult
			if (result.state != "success") {
				console.log(result.data)
				alert("등록 실패입니다.")
				return
			}
			window.location = "../mainpage/Main.html"
		}
	})
};

var pageNo = 1,
pageLength = 6;

function ajaxloadNickName() {
	$.getJSON(serverAddr + "/admin/adminUserInfo.json", function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("해당 회원 정보가 없습니다.")
			return
		}
		$("#userNickNameInfo").text(result.data.member.nickname);
		var photoPath = result.data.profilePhoto;
		var photoPathSplit = photoPath.split(".");
		if (photoPathSplit.length == 2) {
			$("#userPhoto").attr('src',"/TeamProject/upload/"+photoPathSplit[0] + "." + photoPathSplit[1]);
		} else {
			$("#userPhoto").attr('src',"http://graph.facebook.com/"+photoPathSplit[0] + "/picture");
		}
		$("#viewCount").text(result.data.totalViewCount);
		$("#followers").text(result.data.followCollector);
		$("#user-introduce").text(result.data.userInfo)

	})
}

function ajaxFileList() {
	$.getJSON(serverAddr + "/FilePage/getFileList.json",  function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("서버에서 데이터를 가져오는데 실패하였습니다.")
			return
		}
		var data = result.data
//		var totalsize = data.totalPage;
		var cloudUiTemplate = Handlebars.compile($('#CloudUiTemplateText').html())
		$("#boardTable > tbody").html(cloudUiTemplate(data));			

//		$(".titleLink").click(function(event) {
//		window.location.href = "../writepage/writepage.html?no=" + $(this).attr("data-no") 

//		if (pageLength >  totalsize) {
//		$('.moreViewBtn').css("display", "none")
//		} 
		$(document.body).on('click', '.btn-danger',  function(event) {
			var rNumber = $(this).attr("data-no")
			var result = confirm("게시물을 삭제하시겠습니까?\n삭제한 게시물은 복구 불가능합니다.");
			if(result) {
				// 확인 버튼 누를시 
				//ajaxDeleteBoard(rNumber)
				alert("확인버튼");
			} else {
				//취소 버튼 누를시 
			}
		});
	})
}
$(document.body).on("click","#cancleFileBtn",function(event) {
	$('#yourModal').on('hidden.bs.modal', function (e) {
		$("#fileUpload").val("");
		$("#fileListWrap").html("");
	})
})

//$("#submitBoard").click(function(event) {

//var fileUploadData = new FormData();

//$($("#InputFile")[0].files).each(function(index, file) {
//formData.append("files", file)
//});
//});


