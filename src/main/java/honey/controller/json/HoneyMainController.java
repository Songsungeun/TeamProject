package honey.controller.json;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
      System.out.println("postList");
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      return JsonResult.success(mainDao.selectList(map));
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="mostPost")
  public Object poplist(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="10") int length) throws Exception {
    try {
      System.out.println("mostPost");
      HashMap<String,Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      
      return JsonResult.success(mainDao.popularList(map));
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  @RequestMapping(path="postdetail")
  public Object detail(int no) throws Exception {
    try {
      mainDao.increaseViewCount(no);
      HoneyMain honeyMain = mainDao.selectOne(no);
      if (honeyMain == null) 
        throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
      
      return JsonResult.success(honeyMain);
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
  
  @RequestMapping(path="increaseLike")
  public Object increase_Like(int no) throws Exception {
    try {
      mainDao.increase_Like(no);
      return JsonResult.success(increase_Like(no));
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  @RequestMapping(path="decreaseLike")
  public Object decrease_Like(int no) throws Exception {
    try {
      mainDao.decrease_Like(no);
      return JsonResult.success(decrease_Like(no));
      
    } catch (Exception e) {
      return JsonResult.fail(e.getMessage());
    }
  }
  
}
  
  
