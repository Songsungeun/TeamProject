package honey.controller.json;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import honey.dao.HoneyMembersDao;
import honey.vo.HoneyMembers;

@Controller
@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/"})
public class HoneymembersController {
  @Autowired HoneyMembersDao hMembersDao;
  
  @RequestMapping(path="add", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String add(HoneyMembers board) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    HashMap<String,Object> result = new HashMap<>();
    System.out.println("hi i received request");
    try {
      hMembersDao.insert(board);
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
  
  @RequestMapping(path="unregister", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String unregister(HttpSession session) throws Exception {
    HashMap<String,Object> result = new HashMap<>();
    HoneyMembers member = (HoneyMembers)session.getAttribute("HoneyMembers");
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("no", member.getMemberNo());
    } catch (Exception e) {
      result.put("state", "fail");
      result.put("data", e.getMessage());
    }
    return new Gson().toJson(result);
  }
}
