package honey.controller.json;

import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.google.gson.Gson;

import honey.dao.HoneyMembersDao;
import honey.vo.HoneyMembers;

@Controller
@RequestMapping("/mainpage/")       // 혹시나 몰라 나중에 이부분 유심히 볼것
@SessionAttributes({"HoneyMembers"})    // 이부분ㄴ도 잘 모르겠다.
public class HoneyUserAuthController {

  @Autowired HoneyMembersDao hMemberDao;

  @RequestMapping(path="login",  produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String login(
      HttpSession session,
      HttpServletResponse response,
      String email,
      String password,
      Model model,
      SessionStatus sessionStatus) throws Exception {
    System.out.println("hi i received");
    HashMap<String,Object> result = new HashMap<>();
    try {

      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("email", email);
      paramMap.put("password", password);
      System.out.println(email);
      System.out.println(password);
      HoneyMembers member = hMemberDao.selectOneByEmailAndPassword(paramMap);
      System.out.println(member);
      if (member == null) {
        sessionStatus.setComplete();
        result.put("state", "fail");
        System.out.println("you fail!");
      } else {
        model.addAttribute("member", member);
        result.put("state", "success");
        System.out.println("you success");
      }
    } catch (Exception e) {
      System.out.println("sorry");
      result.put("state", "error");
      result.put("data", e.getMessage());
    }
    return new Gson().toJson(result);
  }



  @RequestMapping(path="loginUser", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String loginUser(HttpSession session) throws Exception {

    HashMap<String,Object> result = new HashMap<>();
    try {
      HoneyMembers member = (HoneyMembers)session.getAttribute("member");
      if (member == null) {
        throw new Exception("로그인이 되지 않았습니다.");
      }
      result.put("state", "success");
      result.put("data", member);
    } catch (Exception e) {
      result.put("state", "error");
      result.put("data", e.getMessage());
    }
    return new Gson().toJson(result);  
  }
}
