package honey.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyParentComentDao;
import honey.service.HoneyParentComentService;
import honey.vo.HoneyMain;

@Service
public class DefaultHoneyParentComentService implements HoneyParentComentService {
  @Autowired HoneyParentComentDao parentCmtDao;
  
  public List<HoneyMain> getParentComent(int no,int pageNo, int length) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", (pageNo -1)* length);
    map.put("length", length);
    map.put("postNo", no);
    return parentCmtDao.pComentsList(map);
  }
  public void insertPComent(HoneyMain honeyMain) throws Exception {
    parentCmtDao.insert(honeyMain);
  }
  public void updatePComent(HoneyMain honeyMain) throws Exception {
    parentCmtDao.update(honeyMain);
  }
  public void deletePComent(int no) throws Exception {
    parentCmtDao.delete(no);
  }
}
  
  
