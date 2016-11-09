package honey.controller.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.service.HoneyAdminService;
import honey.service.HoneyMainService;
import honey.service.HoneymembersService;
import honey.service.impl.DefaultHoneyBoardService;
import honey.vo.FileList;
import honey.vo.HoneyBoardFile;
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
    @Autowired DefaultHoneyBoardService boardService;
    
    @RequestMapping(path = "adminPostlist")
    public Object postList(
        HttpSession session,
        @RequestParam(defaultValue = "1") int pageNo,
        @RequestParam(defaultValue = "6") int length)throws Exception {
      try {
      HoneyMembers honeyMember = (HoneyMembers)session.getAttribute("member");
      List<HoneyMain>list = honeyAdminService.adminBoardList(session, pageNo, length);
      int totalPage = honeyAdminService.getTotalPage(session, length);
      List<UrlInfo> urlList = mainService.getURLList();
      List<HoneyMain> resultList = SetImage.setImage(list, urlList);
      
      for (int i = 0; i < resultList.size(); i++) {
        String userPhoto = mainService.getPhoto(Integer.parseInt(resultList.get(i).getUserNo()));
        list.get(i).setUserProfilePath(userPhoto);
      }
      
      
      
      
      HashMap<String,Object> data = new HashMap<>();
      data.put("list", list);    
      data.put("totalPage", totalPage);
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
        HoneyMembers userInfo = hMembersService.getUserInfo(member.getMemberNo());
        int totalViewCount = 0;
        for (HoneyMain count : list) {
          totalViewCount += count.getViewCount();
        }
        
        HashMap<String,Object> resultMap = new HashMap<>();
        resultMap.put("followCollector",followCollector.size());
        resultMap.put("totalViewCount", totalViewCount);
        resultMap.put("member", member);
        resultMap.put("userInfo", userInfo.getIntroduce());
        resultMap.put("profilePhoto", memberFile.getFilename());
        
        if (resultMap.isEmpty() == true) {
          throw new Exception("로그인이 되지 않았습니다.");
        }
        return JsonResult.success(resultMap);
      } catch (Exception e) {
        return JsonResult.error(e.getMessage());
      }
    }
    
    @RequestMapping("postdetail")
    public Object detail(int no) throws Exception {
  System.out.println("no 받음 : " + no);
      
      mainService.getIncreaseViewCount(no);
      HoneyMain honeyMain = mainService.getPost(no);
      HashMap<String, Object> map = new HashMap<>();
      String userPhoto = mainService.getPhoto(Integer.parseInt(honeyMain.getUserNo()));
      honeyMain.setUserProfilePath(userPhoto);
      System.out.println("fileStatus: " + honeyMain.getFileStatus());
      
      List<FileList> fileList = new ArrayList<FileList>();
      if (honeyMain.getFileStatus() == 1) {
        System.out.println("honeyMainNo=" + honeyMain.getNo());
        fileList = mainService.getFileList(honeyMain.getNo());
      }
    
      UrlInfo urlInfo = new UrlInfo();
      if (mainService.getUrl(no) != null) {
        urlInfo = mainService.getUrl(no);
        String temp = urlInfo.getImage();
        temp = "<img alt='photo' src='" + temp + "'>";
        urlInfo.setImage(temp);
      } 

      map.put("fileList", fileList);
      map.put("board", honeyMain);
      map.put("urlInfo", urlInfo);
      
      return JsonResult.success(map);
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
