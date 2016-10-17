package honey.controller.json;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.HttpClientBuilder;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import honey.dao.tempDao;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

@Controller
@RequestMapping({"/mainpage/", "/writepage/"})
public class HoneyBoardController {
  @Autowired tempDao boardDao;
  
  @RequestMapping(path="writeadd")
  public Object add(honey_boards board, HttpSession session) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    System.out.println("요청 받음");
    try {
      
      HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
      board.setUserNo(hMember.getMemberNo());
      boardDao.insert(board);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
      System.out.println("detail 메서드 실");
	  try {
	      honey_boards board = boardDao.selectOne(no);
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
      
      if (boardDao.selectOne(board.getNo()) == null) {
        throw new Exception("해당 게시물이 없습니다.");
      }
      boardDao.update(board);
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
      
      if (boardDao.selectOne(no) == null) {
        throw new Exception("해당 게시물이 없습니다.");
      }
      boardDao.delete(no);
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