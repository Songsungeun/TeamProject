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
import honey.vo.JsonResult;

@Controller
@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/"})
public class HoneymembersController {
  @Autowired HoneyMembersDao hMembersDao;

  @RequestMapping(path="joinMember")
  public Object joinMember(HoneyMembers board) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    try {
      hMembersDao.joinMember(board);
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }

  @RequestMapping(path="unregisteMember")
  public Object unregister(int memberNo, HttpSession session, SessionStatus sessionStatus) throws Exception {
    sessionStatus.setComplete();
    session.invalidate();

    try {
      hMembersDao.unregisteMember(memberNo);
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }


  @RequestMapping(path="userInfoDetail")
  public Object userInfoDetail (int memberNo) throws Exception {
    HashMap<String,Object> result = new HashMap<>();
    try {
      HoneyMembers hMembers = hMembersDao.selectUserInfo(memberNo);

      if(hMembers == null) {
        System.out.println("해당 회원 정보가 없습니다.");
      }
      return JsonResult.success(hMembers);
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="userStatusUpdate")
  public Object userStatusUpdate(HoneyMembers hmember) throws Exception {
    try {
      hMembersDao.userInfoUpdate(hmember);
      return JsonResult.success();
    } catch(Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
}