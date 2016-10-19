package honey.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyChildComentDao;
import honey.service.HoneyChildComentService;
import honey.vo.HoneyMain;

@Service
public class DefaultHoneyChildComentService implements HoneyChildComentService {
  @Autowired HoneyChildComentDao childCmtDao;
  
  @Override
  public List<HoneyMain> getChildComent(int no, int pageNo, int length) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", (pageNo -1)* length);
    map.put("length", length);
    map.put("postCNO", no);
    return childCmtDao.cComentsList(map);
  }
  @Override
  public void insert(HoneyMain honeyMain) throws Exception {
    childCmtDao.insert(honeyMain);
  }
  @Override
  public void update(HoneyMain honeyMain) throws Exception {
    childCmtDao.update(honeyMain);
  }
  @Override
  public void delete(int no) throws Exception {
    childCmtDao.delete(no);
  }
}
  
  
