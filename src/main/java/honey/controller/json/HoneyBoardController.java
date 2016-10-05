package honey.controller.json;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import honey.dao.tempDao;
import honey.vo.JsonResult;
import honey.vo.honey_boards;

@Controller
@RequestMapping({"/mainpage/", "/writepage/"})
public class HoneyBoardController {
  @Autowired tempDao boardDao;
  
  @RequestMapping(path="writeadd")
  public Object add(honey_boards board) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    System.out.println("요청 받음");
    try {
      boardDao.insert(board);
      return JsonResult.success();

    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="detail")
  public Object detail(int no) throws Exception {
    
    try {
      honey_boards board = boardDao.selectOne(no);
      
      if (board == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(board);
      
    } catch (Exception e) {
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
