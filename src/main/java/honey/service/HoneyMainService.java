package honey.service;

import java.util.List;

import honey.vo.HoneyMain;



public interface HoneyMainService {
  List<HoneyMain> getMainList(int pageNo, int length) throws Exception;
  
  List<HoneyMain> getPopList(int pageNo, int length) throws Exception;
  
  HoneyMain getPost(int no) throws Exception;
  
  void getIncreaseViewCount(int no) throws Exception;
  
  void increase_Like(int no) throws Exception;
  
  void decrease_Like(int no) throws Exception;
  
}
