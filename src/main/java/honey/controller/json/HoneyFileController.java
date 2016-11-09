package honey.controller.json;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.service.impl.DefaultHoneyBoardService;
import honey.vo.HoneyBoardFile;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;

@Controller
@RequestMapping({"/FilePage/"})
public class HoneyFileController {
	@Autowired DefaultHoneyBoardService boardService;
	@Autowired ServletContext sc;


	@RequestMapping(path="getFileList")
	public Object fileList(HttpSession session) throws IOException {
		HashMap map = new HashMap<>();
		try {
			int memberNo =  ((HoneyMembers)session.getAttribute("member")).getMemberNo();
			List<HoneyBoardFile> fileList = boardService.getFileList(memberNo);
			String extension;
			String[] extensionArr;
			for (int i = 0; i < fileList.size(); i++) {
				extension = fileList.get(i).getOriginFileName();
				extensionArr = extension.split("\\.");
				
				if(extensionArr[extensionArr.length-1].equals("txt")) {
					fileList.get(i).setFileThumbnail("txt.png");
				} else if (extensionArr[extensionArr.length-1].equals("avi")) {
					fileList.get(i).setFileThumbnail("avi.png");
				} else if (extensionArr[extensionArr.length-1].equals("doc") || extensionArr[extensionArr.length-1].equals("docx")) {
					fileList.get(i).setFileThumbnail("doc.png");
				} else if (extensionArr[extensionArr.length-1].equals("mp4")) {
					fileList.get(i).setFileThumbnail("mp4.png");
				} else if (extensionArr[extensionArr.length-1].equals("mpeg")) {
					fileList.get(i).setFileThumbnail("mpeg.png");
				} else if (extensionArr[extensionArr.length-1].equals("pdf")) {
					fileList.get(i).setFileThumbnail("pdf.png");
				} else if (extensionArr[extensionArr.length-1].equals("ppt") || extensionArr[extensionArr.length-1].equals("pptx")) {
					fileList.get(i).setFileThumbnail("ppt.png");
				} else if (extensionArr[extensionArr.length-1].equals("wmv")) {
					fileList.get(i).setFileThumbnail("wmv.png");
				} else if (extensionArr[extensionArr.length-1].equals("xls") || extensionArr[extensionArr.length-1].equals("xlsx")) {
					fileList.get(i).setFileThumbnail("xls.png");
				} else if (extensionArr[extensionArr.length-1].equals("zip") || extensionArr[extensionArr.length-1].equals("7z") || extensionArr[extensionArr.length-1].equals("egg") || extensionArr[extensionArr.length-1].equals("rar") || extensionArr[extensionArr.length-1].equals("alz")) {
					fileList.get(i).setFileThumbnail("zip.png");
				} else if (extensionArr[extensionArr.length-1].equals("jpg") || extensionArr[extensionArr.length-1].equals("jpeg") || extensionArr[extensionArr.length-1].equals("png") || extensionArr[extensionArr.length-1].equals("svg") || extensionArr[extensionArr.length-1].equals("bmp") 
						|| extensionArr[extensionArr.length-1].equals("gif")) {
					fileList.get(i).setFileThumbnail(fileList.get(i).getFileName());
				} else {
					fileList.get(i).setFileThumbnail("java.png");
				}
				
				double mb = Math.round(((fileList.get(i).getFileSize() / (double)1048576) * 100d));
				System.out.println("mb size= " + mb);
				double temp = mb / 100d;
				System.out.println("temp= " + temp);
				fileList.get(i).setFileSize(temp);
			
				
			}
			map.put("fileList", fileList);
			return JsonResult.success(map);

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getStackTrace());
		}
	}
}

