package honey.controller.json;

import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import honey.dao.HoneyMembersDao;
import honey.vo.JsonResult;
import honey.vo.HoneyMembers;

@Controller

@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/"})  // 맵핑정보를 배열형태로 담을수 도 있다!!! 
@SessionAttributes({"HoneyMembers"})  // vo 객체를 맵핑시키나? 뭔지 확실히는 모르겠는데 vo객체 이름 주니까 된다.
public class HoneyUserAuthController {

  @Autowired HoneyMembersDao hMemberDao;

  @RequestMapping(path="login")
  public Object login(
      HttpSession session,
      String email,
      String password,
      Model model,
      SessionStatus sessionStatus) throws Exception {
    
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("email", email);
      paramMap.put("password", password);
      HoneyMembers member = hMemberDao.selectOneByEmailAndPassword(paramMap);
      
      if (member == null) {
        sessionStatus.setComplete();
        return JsonResult.fail();
      } else {
        session.setAttribute("member", member);
        // 세선 만들어서 따로 관리하려던 객체 여기서 써먹는다.
        return JsonResult.success();
      }
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }



  @RequestMapping(path="loginUser")
  public Object loginUser(HttpSession session) throws Exception {
    try {
      HoneyMembers member = (HoneyMembers)session.getAttribute("member");
      System.out.println(member);
      
      // 위에서 만든 세선 객체를 여기서 꽂는다
      if (member == null) {
        throw new Exception("로그인이 되지 않았습니다.");
      }
      return JsonResult.success(member);
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
  
  @RequestMapping(path="logout")
  public Object logout(HttpSession session, SessionStatus sessionStatus) throws Exception {
    try {
      sessionStatus.setComplete();
      session.invalidate();
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.error(e.getMessage());
    }
  }
}
