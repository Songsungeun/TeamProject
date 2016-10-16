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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import honey.service.impl.DefaultHoneyBoardService;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

@Controller
@RequestMapping({"/mainpage/", "/writepage/"})
public class HoneyBoardController {
  @Autowired DefaultHoneyBoardService boardService;
  
  @RequestMapping(path="writeadd")
  public Object add(honey_boards board, HttpSession session) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    System.out.println("요청 받음");
    try {
      
      HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
      board.setUserNo(hMember.getMemberNo());
      boardService.insertBoard(board);
      return JsonResult.success();

    } catch (Exception e) {
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
	      
	      System.out.println("scrap 객체 생성준비");
	      
	   // 가져올 HTTP 주소 세팅
	      HttpPost http = new HttpPost(board.getUrl());
	      // 가져오기를 실행할 클라이언트 객체 생성
	      HttpClient httpClient = HttpClientBuilder.create().build();
	      // 실행 및 실행 데이터를 Response 객체에 담음
	      HttpResponse response = httpClient.execute(http);
	      // Response 받은 데이터중, DOM 데이터를 가져와 Entity에 담음
	      HttpEntity entity = response.getEntity();
	      //Charset을 알아내기 위해 DOM의 컨텐트 아입을 가져와 담고 Charset을 가져옴
	      ContentType contentType = ContentType.getOrDefault(entity);
	      Charset charset = contentType.getCharset();
	      // DOM 데이터를 한 줄씩 읽기 위해 Reader에 담음
	      BufferedReader br = new BufferedReader(new InputStreamReader(entity.getContent(), charset));
	      // 가져온 DOM 데이터를 담기 위한 그릇
	      StringBuffer sb = new StringBuffer();
	      // DOM 데이터 가져오기
	      String line = "";
	      while((line=br.readLine()) != null) {
	        sb.append(line+"\n");
	      }
	      
	      // Jsoup으로 파싱해보자.
	      Document doc = Jsoup.parse(sb.toString());
	      
	      // Jsoup에서 제공하는 Connect 처리
	      Document doc2 = Jsoup.connect(board.getUrl()).get();
	      System.out.println(doc2.data());
	      board.setUrlInfo(doc2.data().toString());
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