package honey.controller.json;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import honey.dao.tempDao;
import honey.vo.HoneyMembers;
import honey.vo.honey_boards;

@Controller
@RequestMapping({"/mainpage/", "/writepage/"})
public class HoneyBoardController {
  @Autowired tempDao boardDao;
  
  @RequestMapping(path="writeadd", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String add(honey_boards board) throws Exception {
    // 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
    HashMap<String,Object> result = new HashMap<>();
    System.out.println("hi i received request");
    try {
      boardDao.insert(board);
      result.put("state", "success");
    } catch (Exception e) {
      e.printStackTrace();
      result.put("state", "fail");
      result.put("data", e.getMessage());
    }
    
    return new Gson().toJson(result);
  }
  
  @RequestMapping(path="detail", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public String detail(int no) throws Exception {
    HashMap<String,Object> result = new HashMap<>();
    
    try {
      honey_boards board = boardDao.selectOne(no);
      
      if (board == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      result.put("state", "success");
      result.put("data", board);
      
    } catch (Exception e) {
      result.put("state", "fail");
      result.put("data", e.getMessage());
    }
    
    return new Gson().toJson(result);
  }
  
}
