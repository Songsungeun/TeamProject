package honey.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyComentDao;
import honey.service.HoneyComentService;
import honey.vo.HoneyComent;

@Service
public class DefaultHoneyComentService implements HoneyComentService {
  @Autowired HoneyComentDao comentDao;
  
  public List<HoneyComent> getComent(int boardNo,int pageNo, int length) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", (pageNo -1)* length);
    map.put("length", length);
    map.put("boardNo", boardNo);
    return comentDao.comentList(map);
  }
  public void insertComent(HoneyComent honeyComent) throws Exception {
    comentDao.insertComent(honeyComent);
  }
  public void insertChildComent(HoneyComent honeyComent) throws Exception {
    comentDao.insertChildComent(honeyComent);
  }
  public void saveCometNo(HoneyComent honeyComent) throws Exception {
    comentDao.saveCometNo(honeyComent);
  }
  public void updateComent(HoneyComent honeyComent) throws Exception {
    comentDao.updateComment(honeyComent);
  }
  public HoneyComent detailComent(int cmtNo) throws Exception {
    return comentDao.comentDetail(cmtNo);
  }
  public void deleteComent(int cmtNo) throws Exception {
    comentDao.delete(cmtNo);
  }
  public void childDeleteComent(int cmtNo) throws Exception {
    comentDao.childdelete(cmtNo);
  }
}
  
  
