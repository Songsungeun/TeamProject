package honey.controller.json;

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
import honey.vo.HoneyComent;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;

@Controller
@RequestMapping("/mainpage/")
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

		for (int i = 0; i < list.size(); i++) {
			
			for (int j = 0; j < urlList.size(); j++) {
				if (list.get(i).getNo() == urlList.get(j).getBd_No()) {
					list.get(i).setLinkTitle(urlList.get(j).getTitle());
					list.get(i).setLinkDesc(urlList.get(j).getDescription());
					list.get(i).setLinkImage(urlList.get(j).getImage());
					list.get(i).setLinkURL(urlList.get(j).getUrlAddr());
					list.get(i).setLinkDetailUrl(urlList.get(j).getDetailUrl());
					System.out.println("link있는애: " + list.get(i).getLinkImage());
				}
				String userPhoto = mainService.getPhoto(Integer.parseInt(list.get(i).getUserNo()));
				list.get(i).setUserProfilePath(userPhoto);
			}
			//String[] imageHref = list.get(i).getLinkDesc().split("\"");
			System.out.println("번호: " + i + "getLinkImage: " + list.get(i).getLinkImage());
			if (list.get(i).getLinkImage() == null) {
				if (list.get(i).getContents() != null) {
					boolean image = list.get(i).getContents().contains("img src");
					System.out.println("boolean: " + image);
					if (image) {
						String[] temp = list.get(i).getContents().split("src=");
						String[] temp1 = temp[1].split(" ");
						String[] temp2 = temp1[0].split("\"");
						list.get(i).setLinkImage(temp2[1]);
						System.out.println("temp1[0] =" + temp1[0]);
						System.out.println("temp1[0] =" + temp2[1]);
						System.out.println("이거: " + list.get(i).getLinkImage());
					} else {
						list.get(i).setLinkImage("/TeamProject/upload/MainDefault.jpg");
					}
				}
			}
			
		}
		return JsonResult.success(list);
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
		mainService.getIncreaseViewCount(no);
		HoneyMain honeyMain = mainService.getPost(no);
		HashMap<String, Object> map = new HashMap<>();
		map.put("board", honeyMain);

		UrlInfo urlInfo;
		if (mainService.getUrl(no) != null) {
			urlInfo = mainService.getUrl(no);
			String temp = urlInfo.getImage();
			temp = "<img alt='photo' src='" + temp + "'>";
			urlInfo.setImage(temp);
			map.put("urlInfo", urlInfo);
			return JsonResult.success(map);
		} else {
			return JsonResult.success2(map);
		}
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


