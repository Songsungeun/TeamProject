package honey.controller.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import honey.service.HoneyComentService;
import honey.service.HoneyMainService;
import honey.vo.FileList;
import honey.vo.HoneyComent;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;

@Controller
@RequestMapping({"/mainpage/", "/membership/"})
@SessionAttributes({"HoneyMain"})
public class HoneyMainController {
	@Autowired HoneyMainService mainService;
	@Autowired HoneyComentService comentService;

	@RequestMapping("postlist")
	public Object list(
			HttpSession session,
			@RequestParam(defaultValue="1") int pageNo,
			@RequestParam(defaultValue="20") int length
			) throws Exception {
		List<HoneyMain> list = mainService.getMainList(pageNo, length);
		List<UrlInfo> urlList = mainService.getURLList();

		try {
			List<HoneyMain> settingUrlBoard = SetImage.setImage(list, urlList);
			for (int i = 0; i < settingUrlBoard.size(); i++) {
				String userPhoto = mainService.getPhoto(Integer.parseInt(settingUrlBoard.get(i).getUserNo()));
				list.get(i).setUserProfilePath(userPhoto);
			}
			List<HoneyMain> list1 = new ArrayList<HoneyMain>();
			List<HoneyMain> list2 = new ArrayList<HoneyMain>();
			List<HoneyMain> list3 = new ArrayList<HoneyMain>();
			List<HoneyMain> list4 = new ArrayList<HoneyMain>();
			
			for (int i = 0; i < settingUrlBoard.size(); i++) {
				if (i % 4 == 0) {
					list1.add(settingUrlBoard.get(i));
				} else if (i % 4 == 1) {
					list2.add(settingUrlBoard.get(i));
				} else if (i % 4 == 2) {
					list3.add(settingUrlBoard.get(i));
				} else if (i % 4 == 3) {
					list4.add(settingUrlBoard.get(i));
				}
			}
			HashMap<String,Object> listMap = new HashMap<>();
			listMap.put("list1", list1);
			listMap.put("list2", list2);
			listMap.put("list3", list3);
			listMap.put("list4", list4);
			
			return JsonResult.success(listMap);
		} catch (Exception e) {
			return JsonResult.fail();
		}
	}
	@RequestMapping("selectListandCategory")
  public Object selectListandCategory(
      HttpSession session,
      int no,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="100") int length) throws Exception {
    List<HoneyMain> categorylist = mainService.getselectListandCategory(no, pageNo, length);
    List<UrlInfo> urlList = mainService.getURLList();
    try {
      List<HoneyMain> settingUrlBoard = SetImage.setImage(categorylist, urlList);
      for (int i = 0; i < settingUrlBoard.size(); i++) {
        String userPhoto = mainService.getPhoto(Integer.parseInt(settingUrlBoard.get(i).getUserNo()));
        categorylist.get(i).setUserProfilePath(userPhoto);
      }
      return JsonResult.success(categorylist);
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
	@RequestMapping("comentList")
	public Object comentList(
			HttpSession session,
			int no,
			@RequestParam(defaultValue="1") int pageNo,
			@RequestParam(defaultValue="100") int length) throws Exception {
		try {
			List<HoneyComent> list = comentService.getComent(no, pageNo, length);
			HashMap<String, Object> map = new HashMap<>();
			HoneyMembers member = (HoneyMembers)session.getAttribute("member");
			Object membNo;
			if(member == null) {
				membNo = 0;
			} else {
				membNo = member.getMemberNo();
			}
			System.out.println("comentList - member = " + membNo);
			map.put("LoginInfo", membNo);
			map.put("comentList", list);
			return JsonResult.success(map);
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}
	@RequestMapping("mostPost")
	public Object poplist(
			@RequestParam(defaultValue="1") int pageNo,
			@RequestParam(defaultValue="10") int length,
			Model model) throws Exception {
		List<HoneyMain> list = mainService.getPopList(pageNo, length);
		model.addAttribute("mostPost", list);
		return JsonResult.success(list);
	}
	@RequestMapping("postdetail")
	public Object detail(int no) throws Exception {
System.out.println("no 받음 : " + no);
		
		mainService.getIncreaseViewCount(no);
		HoneyMain honeyMain = mainService.getPost(no);
		HashMap<String, Object> map = new HashMap<>();
		String userPhoto = mainService.getPhoto(Integer.parseInt(honeyMain.getUserNo()));
		honeyMain.setUserProfilePath(userPhoto);
		System.out.println("fileStatus: " + honeyMain.getFileStatus());
		
		List<FileList> fileList = new ArrayList<FileList>();
		if (honeyMain.getFileStatus() == 1) {
			System.out.println("honeyMainNo=" + honeyMain.getNo());
			fileList = mainService.getFileList(honeyMain.getNo());
		}
	
		UrlInfo urlInfo = new UrlInfo();
		if (mainService.getUrl(no) != null) {
			urlInfo = mainService.getUrl(no);
			String temp = urlInfo.getImage();
			temp = "<img alt='photo' src='" + temp + "'>";
			urlInfo.setImage(temp);
		} 

		map.put("fileList", fileList);
		map.put("board", honeyMain);
		map.put("urlInfo", urlInfo);
		
		return JsonResult.success(map);
	}
	@RequestMapping("comentDetail")
	public Object comentDetail(int no, HttpSession session) throws Exception {
		try{
			HoneyComent honeyComent = comentService.detailComent(no);
			return JsonResult.success(honeyComent);
		} catch(Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}
	@RequestMapping("insertComent")
	public Object insertComent(HoneyComent honeyComent, HttpSession session) throws Exception {
		try{
			System.out.println("inserComent 실행");
			HoneyMembers member = (HoneyMembers)session.getAttribute("member");
			System.out.println("CmtInsertMemberNo= " + member.getMemberNo());
			honeyComent.setMemberNo(member.getMemberNo());
			//      HoneyMain honeyMain = (HoneyMain)session.getAttribute("honeyMain");
			//      session.setAttribute("honeyCmt", honeyComent);
			//      honeyComent.setNo(honeyMain.getNo());
			//      System.out.println(honeyComent.getNo());
			comentService.insertComent(honeyComent);
			comentService.saveCometNo(honeyComent);
			return JsonResult.success(honeyComent);
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}
	@RequestMapping("insertChildComent")
	public Object insertChildComent(HoneyComent honeyComent, HttpSession session) throws Exception {
		try{
			System.out.println("insertChildComent 실행");
			HoneyMembers member = (HoneyMembers)session.getAttribute("member");
			System.out.println("CmtInsertMemberNo= " + member.getMemberNo());
			honeyComent.setMemberNo(member.getMemberNo());
			//      HoneyMain honeyMain = (HoneyMain)session.getAttribute("honeyMain");
			//      session.setAttribute("honeyCmt", honeyComent);
			//      honeyComent.setNo(honeyMain.getNo());
			//      System.out.println(honeyComent.getNo());
			comentService.insertChildComent(honeyComent);
			comentService.saveCometNo(honeyComent);
			return JsonResult.success(honeyComent);
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping("updateComment")
	public Object updateComment(HoneyComent honeyComment, HttpSession session) throws Exception {
		try{
			System.out.println("updateComment 실행");
			comentService.updateComent(honeyComment);
			return JsonResult.success();
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping("increaseViewCount")
	public Object increaseViewCount(int no) throws Exception {
		mainService.getIncreaseViewCount(no);
		return JsonResult.success(increaseViewCount(no));
	}
	@RequestMapping("delete")
	public Object delete(int no) throws Exception {
		try {
			comentService.deleteComent(no);
			return JsonResult.success();

		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}
	@RequestMapping("childdelete")
	public Object childdelete(int no) throws Exception {
		try {
			comentService.childDeleteComent(no);
			return JsonResult.success();

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

}


