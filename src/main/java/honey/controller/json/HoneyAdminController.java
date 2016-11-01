package honey.controller.json;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.dao.HoneyMembersDao;
import honey.dao.tempDao;
import honey.service.HoneyAdminService;
import honey.service.HoneyMainService;
import honey.service.HoneymembersService;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.MemberFile;
import honey.vo.UrlInfo;

@Controller
@RequestMapping("/admin/")
public class HoneyAdminController {

    @Autowired HoneyAdminService honeyAdminService;
    @Autowired HoneymembersService hMembersService;
    @Autowired HoneyMainService mainService;
    @Autowired tempDao tempdao;
    @Autowired HoneyMembersDao hMemberDao;
    
    @RequestMapping(path = "adminPostlist")
    public Object postList(
        HttpSession session,
        @RequestParam(defaultValue = "1") int pageNo,
        @RequestParam(defaultValue = "6") int length)throws Exception {
      try {
        
      List<HoneyMain>list = honeyAdminService.adminBoardList(session, pageNo, length);
      List<UrlInfo> urlList = mainService.getURLList();
      List<HoneyMain> resultList = SetImage.setImage(list, urlList);
      
      for (int i = 0; i < resultList.size(); i++) {
        String userPhoto = mainService.getPhoto(Integer.parseInt(resultList.get(i).getUserNo()));
        list.get(i).setUserProfilePath(userPhoto);
      }
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);    
      data.put("pageNo", pageNo);
      data.put("length", length);
      
      return JsonResult.success(data);
      }  catch (Exception e) {
        e.printStackTrace();
        return JsonResult.fail(e.getMessage());
      }
    }
    
    @RequestMapping(path = "adminUserInfo")
    public Object loginUser(HttpSession session) throws Exception {
      try {
        HoneyMembers member = (HoneyMembers)session.getAttribute("member");
        MemberFile memberFile = new MemberFile();
        memberFile.setFilename(hMembersService.getProfileFileName(member.getMemberNo()));
        List<HoneyMain> list = hMembersService.getBoards(member.getMemberNo());
        List<HoneyMembers> followCollector = hMembersService.getFollowers(member.getMemberNo());
        
        int totalViewCount = 0;
        for (HoneyMain count : list) {
          totalViewCount += count.getViewCount();
        }
        
        HashMap<String,Object> resultMap = new HashMap<>();
        resultMap.put("followCollector",followCollector.size());
        resultMap.put("totalViewCount", totalViewCount);
        resultMap.put("member", member);
        resultMap.put("profilePhoto", memberFile.getFilename());
        
        if (resultMap.isEmpty() == true) {
          throw new Exception("로그인이 되지 않았습니다.");
        }
        return JsonResult.success(resultMap);
      } catch (Exception e) {
        return JsonResult.error(e.getMessage());
      }
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
