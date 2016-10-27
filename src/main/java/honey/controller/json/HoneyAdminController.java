package honey.controller.json;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.dao.tempDao;
import honey.service.HoneyAdminService;
import honey.vo.JsonResult;
import honey.vo.honey_boards;

@Controller
@RequestMapping("/admin/")
public class HoneyAdminController {

  @Autowired tempDao tempdao;
  @Autowired HoneyAdminService honeyAdminService;

  @RequestMapping(path = "adminlist")
  public Object list(
      HttpSession session,
      @RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "5") int length,
      Model model) throws Exception {
    List<honey_boards>list = honeyAdminService.adminBoardList(session, pageNo, length);
    model.addAttribute("adminlist",list);
    return JsonResult.success(list);
  }

  @RequestMapping(path = "admindelete")
  public Object delete(int no) throws Exception {
    try {
    honeyAdminService.adminBoardDelete(no);
    return JsonResult.success();
  }  catch (Exception e) {
    return JsonResult.fail(e.getMessage());
  }
  }
}
