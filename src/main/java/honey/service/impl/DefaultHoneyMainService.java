package honey.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyMainDao;
import honey.dao.HoneyMainUrlDao;
import honey.service.HoneyMainService;
import honey.vo.HoneyMain;
import honey.vo.UrlInfo;

@Service
public class DefaultHoneyMainService implements HoneyMainService {
  @Autowired HoneyMainDao mainDao;
  @Autowired HoneyMainUrlDao urlDao;
  
  public List<HoneyMain> getMainList(int pageNo, int length) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", (pageNo -1)* length);
    map.put("length", length);
    return mainDao.selectList(map);
  }
  public List<HoneyMain> getPopList(int pageNo, int length) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
    map.put("startIndex", (pageNo -1)* length);
    map.put("length", length);
    return mainDao.popularList(map);
  }
  public HoneyMain getPost(int no) throws Exception {
    return mainDao.selectOne(no);
  }
//  public void getIncreaseViewCount(int no) throws Exception {
//    mainDao.increaseViewCount(no);
//  }
  public void increase_Like(int no) throws Exception {
    mainDao.increase_Like(no);
  }
  
  public void decrease_Like(int no) throws Exception {
    mainDao.decrease_Like(no);
  }
  
  public UrlInfo getUrl(int no) throws Exception {
	  return urlDao.selectOne(no);
  }
}
  
  
