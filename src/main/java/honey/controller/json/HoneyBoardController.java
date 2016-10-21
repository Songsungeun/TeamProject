package honey.controller.json;

import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import honey.service.impl.DefaultHoneyBoardService;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

@Controller
@RequestMapping({"/mainpage/", "/writepage/"})
public class HoneyBoardController {
  @Autowired DefaultHoneyBoardService boardService;
  @Autowired ServletContext sc;
  
  @RequestMapping(path="writeadd")
  public Object add(
		  honey_boards board, 
//		  MultipartFile file1,
//		  MultipartFile file2,
		  HttpSession session) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    System.out.println("요청 받음");
    String uploadDir = sc.getRealPath("/upload") + "/";
    try {
      System.out.println("add start");
      HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
      System.out.println(hMember.getMemberNo());
      // 보드 멤버 넘버 셋
      board.setUserNo(hMember.getMemberNo());
      UrlInfo url = Scrapper.UrlForDB(board.getUrl());
      url.setMb_No(hMember.getMemberNo());
      
      boardService.insertBoard(board, uploadDir);
      boardService.insertUrl(url);
      
      return JsonResult.success();

    } catch (Exception e) {
      e.printStackTrace();
      return JsonResult.fail(e.getMessage());
    }
  }
  

@RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
      System.out.println("detail 메서드 실");
	  try {
	      honey_boards board = boardService.getBoard(no);
	      System.out.println("board 객체 받아옴");
	      if (board == null) 
	        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
	      
	     
	      return JsonResult.success(board);
	      
	    } catch (Exception e) {
	    	e.printStackTrace();
	      return JsonResult.fail(e.getMessage());
	    }
    
  }
  
  @RequestMapping(path="write_update")
  public Object update(honey_boards board) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("no", board.getNo());
      
      if (boardService.getBoard(board.getNo()) == null) {
        throw new Exception("해당 게시물이 없습니다.");
      }
      boardService.updateBoard(board);
      return JsonResult.success();
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
    
  }
  
  @RequestMapping(path="write_delete")
  public Object delete(int no) throws Exception {
    try {
      HashMap<String,Object> paramMap = new HashMap<>();
      paramMap.put("no", no);
      
      if (boardService.getBoard(no) == null) {
        throw new Exception("해당 게시물이 없습니다.");
      }
      boardService.deleteBoard(no);
      return JsonResult.success();
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  /*
  @RequestMapping(path="preview")
  public Object preview(String url, HttpSession session, SessionStatus sessionStatus) throws Exception {
	  try {
		  if (url ==  null) {
			  sessionStatus.setComplete();
			  System.out.println("서버에 전송된 url: " + url);
			  return JsonResult.fail();
		  } else {
			  session.setAttribute("url", url);
		  }
		  return JsonResult.success();
	  } catch (Exception e) {
		  return JsonResult.error(e.getMessage());
	  }
  }
  */
  @RequestMapping(path="previewlist")
  public Object previewlist(String urlinfo) throws Exception {
	  try {
		  UrlInfo url = Scrapper.parsePageHeaderInfo(urlinfo);
		  return JsonResult.success(url);
	  } catch (Exception e) {
		  return JsonResult.error(e.getMessage());
	  }
  }

}