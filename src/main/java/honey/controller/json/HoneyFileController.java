package honey.controller.json;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.service.HoneymembersService;
import honey.service.impl.DefaultHoneyBoardService;
import honey.vo.HoneyBoardFile;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;

@Controller
@RequestMapping({"/FilePage/", "/membership/"})
public class HoneyFileController {
  @Autowired HoneymembersService hMembersService;
	@Autowired DefaultHoneyBoardService boardService;
	@Autowired ServletContext sc;


	@RequestMapping(path="getFileList")
	public Object fileList(HttpSession session,
	    @RequestParam (defaultValue = "20") int pageLength) throws IOException {
		HashMap<String,Object> map = new HashMap<>();
		try {
			int memberNo =  ((HoneyMembers)session.getAttribute("member")).getMemberNo();
			
			Thumbnail settingThumbnail = new Thumbnail();
			List<HoneyBoardFile>fileList = settingThumbnail.setThumbnail(boardService.getFileList(memberNo, pageLength));
			
//			for (int i = 0; i < fileList.size(); i++) {
//				double mb = Math.round(((fileList.get(i).getFileSize() / (double)1048576) * 100d));
//				System.out.println("mb size= " + mb);
//				double temp = mb / 100d;
//				System.out.println("temp= " + temp);
//				fileList.get(i).setFileSize(temp);
//			}
			for (int i = 0; i < fileList.size(); i++) {
//			  double fileSizes = fileList.get(i).getFileSize();
			  if(fileList.get(i).getFileSize() <= 999999) {
			    double kb = fileList.get(i).getFileSize()*0.000977;
			    String kbSize = String.format("%.2f", (float)kb)+" KB";
			    System.out.println("mb size= " + kbSize);
			    fileList.get(i).setStringFileSize(kbSize);
			  } else {
			    double mb = fileList.get(i).getFileSize()*0.000977*0.0009777;
          String mbsize = String.format("%.2f", (float)mb)+" MB";
          System.out.println("mb size= " + mbsize);
          fileList.get(i).setStringFileSize(mbsize);
			  }
			}
			map.put("pageLength", pageLength);
			map.put("fileList", fileList);
			map.put("fileListLength", fileList.size());
			return JsonResult.success(map);

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getStackTrace());
		}
	}
	
	
	 @RequestMapping(path="getFileList2") 
	  public Object fileList2(HoneyMembers userInfo) throws IOException { // otherUser 출력용 메소
	    HashMap<String,Object> map = new HashMap<>();
	    try {
	      HoneyMembers honeyMember = hMembersService.getUserNumberByNickName(userInfo.getNickname());
	      int memberNo = honeyMember.getMemberNo();
	      Thumbnail settingThumbnail = new Thumbnail();
	      List<HoneyBoardFile>fileList = settingThumbnail.setThumbnail(boardService.getFileList(memberNo));
	      
	      for (int i = 0; i < fileList.size(); i++) {
	        double mb = Math.round(((fileList.get(i).getFileSize() / (double)1048576) * 100d));
	        double temp = mb / 100d;
	        fileList.get(i).setFileSize(temp);
	      }
	      
	      map.put("fileList", fileList);
	      return JsonResult.success(map);

	    } catch (Exception e) {
	      e.printStackTrace();
	      return JsonResult.fail(e.getStackTrace());
	    }
	  }
	 
	 @RequestMapping(path="fileDelete")
	 public Object fileDelete(int no) throws Exception {
	   try{
	    boardService.deleteFile(no);
	   
	    return JsonResult.success();
	  }  catch (Exception e) {
	    return JsonResult.fail(e.getStackTrace());
	 }
}
	 
}





