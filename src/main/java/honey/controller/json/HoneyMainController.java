package honey.controller.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import honey.dao.HoneyMainDao;
import honey.vo.HoneyMain;
import honey.vo.JsonResult;

@Controller
@RequestMapping("/mainpage/")
public class HoneyMainController {
  @Autowired HoneyMainDao mainDao;
  
  @RequestMapping(path="postlist")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="20") int length) throws Exception {
    
    try {
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      return JsonResult.success(mainDao.selectList(map));
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="postdetail")
  public Object detail(int no) throws Exception {
    try {
      HoneyMain honeyMain = mainDao.selectOne(no);
      
      if (honeyMain == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(honeyMain);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
}
  
  
