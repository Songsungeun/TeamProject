package honey.controller.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import honey.dao.HoneyMembersDao;
import honey.service.HoneymembersService;
import honey.vo.JsonResult;
import honey.vo.MemberFile;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;

@Controller

@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/"})  // 맵핑정보를 배열형태로 담을수 도 있다!!! 
@SessionAttributes({"HoneyMembers", "HoneyMain"})  // vo 객체를 맵핑시키나? 뭔지 확실히는 모르겠는데 vo객체 이름 주니까 된다.
public class HoneyUserAuthController {
  @Autowired HoneymembersService hMembersService;
  @Autowired HoneyMembersDao hMemberDao;

  @RequestMapping(path="login")
  public Object login(
      HttpSession session,
      String email,
      String password,
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
      member.setPassword("");
      MemberFile memberFile = new MemberFile();
      memberFile.setFilename(hMembersService.getProfileFileName(member.getMemberNo()));
      List<HoneyMembers> guiderNumberlist = hMembersService.getGuider(member.getMemberNo());
      List<HoneyMembers> temp = new ArrayList<>();
      
      
      for (int i = 0; i < guiderNumberlist.size(); i++) {
    	  HoneyMembers temp1 = new HoneyMembers();
    	  temp1 =  hMemberDao.selectUserNickName(guiderNumberlist.get(i).getMemberNo());
    	  temp1.setProfileFileName(hMembersService.getProfileFileName(guiderNumberlist.get(i).getMemberNo()));
    	  temp1.setMemberNo(guiderNumberlist.get(i).getMemberNo());
    	  temp.add(temp1);
      }
      
      
      HashMap<String,Object> resultMap = new HashMap<>();
      resultMap.put("member", member);
      resultMap.put("profilePhoto", memberFile.getFilename());
      resultMap.put("guiderInfo", temp);
      
      if (resultMap.isEmpty() == true) {
        throw new Exception("로그인이 되지 않았습니다.");
      }
      return JsonResult.success(resultMap);
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