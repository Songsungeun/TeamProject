package honey.controller.json;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.service.HoneyMainService;
import honey.vo.HoneyMain;
import honey.vo.JsonResult;

@Controller
@RequestMapping("/mainpage/")
public class HoneyMainController {
  @Autowired ServletContext sc;
  @Autowired HoneyMainService mainService;
  
  @RequestMapping("postlist")
  public Object list(
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
  public Object detail(int no, Model model) throws Exception {
    mainService.getIncreaseViewCount(no);
    HoneyMain honeyMain = mainService.getPost(no);
    model.addAttribute("honeyMain", honeyMain);
    return JsonResult.success(honeyMain);
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
  
  
