package honey.service;

import java.util.List;

import honey.vo.HoneyMain;



public interface HoneyChildComentService {
  List<HoneyMain> getChildComent(int no,int pageNo, int length) throws Exception;
  void insert(HoneyMain honeyMain) throws Exception;
  void update(HoneyMain honeyMain) throws Exception;
  void delete(int no) throws Exception;
}
