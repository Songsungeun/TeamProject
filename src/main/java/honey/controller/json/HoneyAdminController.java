package honey.controller.json;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.dao.tempDao;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;

@Controller
@RequestMapping("/admin/")
public class HoneyAdminController {

  @Autowired tempDao tempdao;
  
  
  @RequestMapping(path = "adminlist")
  public Object list(
      HttpSession session,
      @RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "5") int length) throws Exception {
    
    try {
      HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
      HashMap<String, Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      map.put("userNo",hMember.getMemberNo());
      return JsonResult.success(tempdao.selectList(map));


    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path = "admindelete")
  public Object delete(int no) throws Exception {
    try {
      if (tempdao.delete(no) == 0) {
        throw new Exception("해당 게시물이 없거나 삭제 실패입니다.");
      }
      tempdao.delete(no);
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
}
