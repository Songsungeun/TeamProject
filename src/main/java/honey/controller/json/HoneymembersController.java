package honey.controller.json;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;

import com.google.gson.Gson;

import honey.dao.HoneyMembersDao;
import honey.vo.HoneyMembers;

@Controller
@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/"})
public class HoneymembersController {
  @Autowired HoneyMembersDao hMembersDao;
  
  @RequestMapping(path="joinMember", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String joinMember(HoneyMembers board) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    HashMap<String,Object> result = new HashMap<>();
    System.out.println("hi i received request");
    try {
      hMembersDao.joinMember(board);
      result.put("state", "success");
      System.out.println(result);
    } catch (Exception e) {
      e.printStackTrace();
      result.put("state", "fail");
      result.put("data", e.getMessage());
    }
    
//    return "redirect:/mainpage/";
    return new Gson().toJson(result);
  }
  
  @RequestMapping(path="unregisteMember", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String unregister(int memberNo, HttpSession session, SessionStatus sessionStatus) throws Exception {
    HashMap<String,Object> result = new HashMap<>();
    System.out.println("hi 나 왔땅!!!!");
    System.out.println(memberNo);
    sessionStatus.setComplete();
    session.invalidate();
    
    try {
      hMembersDao.unregisteMember(memberNo);
      System.out.println("지웠땅 히히");
      result.put("state", "success");
    } catch (Exception e) {
      result.put("state", "fail");
      result.put("data", e.getMessage());
    }
    System.out.println(result);
    return new Gson().toJson(result);
  }
  
  
  @RequestMapping(path="userInfoDetail", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String userInfoDetail (int no, Model model) throws Exception {
    HashMap<String,Object> result = new HashMap<>();
    try {
    HoneyMembers hMembers = hMembersDao.selectUserInfo(no);
    
    if (hMembers == null)
        throw new Exception ("해당 회원 정보가 없습니다.");
    
    result.put("state", "success");
    result.put("data", hMembers);
    } catch (Exception e) {
      result.put("state", "fail");
      result.put("data", e.getMessage());
    }
    return new Gson().toJson(result);
  }
}
