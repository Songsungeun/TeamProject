package honey.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.tempDao;
import honey.service.HoneyAdminService;
import honey.vo.HoneyMembers;
import honey.vo.honey_boards;

@Service
public class DefaultHoneyAdminService implements HoneyAdminService {

  @Autowired tempDao tempdao;
  
  public List<honey_boards> adminBoardList(HttpSession session,int pageNo, int length) throws Exception {
      HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
      HashMap<String, Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      map.put("userNo",hMember.getMemberNo());
      return  tempdao.selectList(map);
  }

  public void  adminBoardDelete(int no) throws Exception {
     tempdao.delete(no);
  }  
}
