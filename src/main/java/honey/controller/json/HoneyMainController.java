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
        }
        String userPhoto = mainService.getPhoto(Integer.parseInt(list.get(i).getUserNo()));
        list.get(i).setUserProfilePath(userPhoto);
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
      
      HoneyMembers member = (HoneyMembers)session.getAttribute("member");
      HashMap<String, Object> map = new HashMap<>();
      map.put("LoginInfo", member.getMemberNo());
      System.out.println("CmtListMemberNo= " + member.getMemberNo());
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
    //mainService.getIncreaseViewCount(no);
    HoneyMain honeyMain = mainService.getPost(no);
    UrlInfo urlInfo = mainService.getUrl(no);
    String temp = urlInfo.getImage();
    temp = "<img alt='photo' src='" + temp + "'>";
    urlInfo.setImage(temp);
    System.out.println(urlInfo.getImage());
    HashMap<String, Object> map = new HashMap<>();
    map.put("board", honeyMain);
    map.put("urlInfo", urlInfo);
    return JsonResult.success(map);
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
  @RequestMapping("increaseLike")
  public Object increase_Like(int no) throws Exception {
    mainService.increase_Like(no);
    return JsonResult.success(increase_Like(no));
  }
  @RequestMapping("decreaseLike")
  public Object decrease_Like(int no) throws Exception {
    mainService.decrease_Like(no);
    return JsonResult.success(decrease_Like(no));
  }
  
}


