package honey.controller.json;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import honey.dao.tempDao;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
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
	      
	      System.out.println("scrap 객체 생성준비");
	      Scrapper scrap = new Scrapper(board.getUrl());
	      
	      board.setLinkTitle(scrap.returnInfo());
	      System.out.println(board.getLinkTitle());
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
}
