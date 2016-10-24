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

import honey.service.HoneyChildComentService;
import honey.service.HoneyMainService;
import honey.service.HoneyParentComentService;
import honey.vo.HoneyMain;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;

@Controller
@RequestMapping("/mainpage/")
@SessionAttributes({"HoneyMain"})
public class HoneyMainController {
  @Autowired HoneyMainService mainService;
  @Autowired HoneyParentComentService parentCmtService;
  @Autowired HoneyChildComentService childCmtService;
  @RequestMapping("postlist")
  public Object list(
      HttpSession session,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="20") int length,
      Model model) throws Exception {
    List<HoneyMain> list = mainService.getMainList(pageNo, length);
    model.addAttribute("postlist", list);
    return JsonResult.success(list);
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
  
  @RequestMapping("parentCmtList")
  public Object parentCmtlist(
      int no,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="20") int length,
      Model model) throws Exception {
    try {
      List<HoneyMain> list = parentCmtService.getParentComent(no, pageNo, length);
      model.addAttribute("parentCmtList", list);
      return JsonResult.success(list);
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  @RequestMapping("childCmtList")
  public Object childCmtlist(
      int no,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="3") int length,
      Model model) throws Exception {
    try {
      List<HoneyMain> list = childCmtService.getChildComent(no,pageNo, length);
      model.addAttribute("childCmtList", list);
      return JsonResult.success(list);
    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
}


