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
			map.put("fileList", fileList);
			return JsonResult.success(map);

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getStackTrace());
		}
	}
}

