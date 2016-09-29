package honey.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.dao.HoneyBoardDao;
import honey.vo.HoneyBoard;

@Controller
@RequestMapping("/honey/")
public class BoardController {

  @Autowired
  HoneyBoardDao honeyBoardDao;

  @RequestMapping("list")
  public String list(
      @RequestParam(defaultValue="1")int pageNo,
      @RequestParam(defaultValue="5")int length,
      Model model) throws Exception {

    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", (pageNo - 1) * length);
    map.put("length", length);

    List<HoneyBoard> list = honeyBoardDao.selectList(map);
    model.addAttribute("list", list);

    return "/board/BoardList.jsp";
  }

}
