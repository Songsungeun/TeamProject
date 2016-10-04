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

@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/"})  // 맵핑정보를 배열형태로 담을수 도 있다!!! 
@SessionAttributes({"HoneyMembers"})  // vo 객체를 맵핑시키나? 뭔지 확실히는 모르겠는데 vo객체 이름 주니까 된다.
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
        model.addAttribute("HoneyMembers", member);
        // 세선 만들어서 따로 관리하려던 객체 여기서 써먹는다.
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
    System.out.println("hi im loginUser");
    HashMap<String,Object> result = new HashMap<>();
    try {
      HoneyMembers member = (HoneyMembers)session.getAttribute("HoneyMembers");
      // 위에서 만든 세선 객체를 여기서 꽂는다
      System.out.println("hi im loginUser");
      System.out.println(member);
      if (member == null) {
        throw new Exception("로그인이 되지 않았습니다.");
      }
      result.put("state", "success");
      result.put("data", member);
    } catch (Exception e) {
      System.out.println("hi im loginUser error!!");
      result.put("state", "error");
      result.put("data", e.getMessage());
      e.printStackTrace();
    }
    return new Gson().toJson(result);  
  }
  
  @RequestMapping(path="logout", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String logout(HttpSession session, SessionStatus sessionStatus) throws Exception {
    HashMap<String,Object> result = new HashMap<>();
    try {
      sessionStatus.setComplete();
      session.invalidate();
      result.put("state", "success");
    } catch (Exception e) {
      result.put("state", "error");
      result.put("data", e.getMessage());
    }
    return new Gson().toJson(result);   
  }
}
