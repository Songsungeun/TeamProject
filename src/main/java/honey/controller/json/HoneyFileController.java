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
		HashMap<String,Object> map = new HashMap<>();
		try {
			int memberNo =  ((HoneyMembers)session.getAttribute("member")).getMemberNo();
			
			Thumbnail settingThumbnail = new Thumbnail();
			List<HoneyBoardFile>fileList = settingThumbnail.setThumbnail(boardService.getFileList(memberNo));
			
			for (int i = 0; i < fileList.size(); i++) {
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

