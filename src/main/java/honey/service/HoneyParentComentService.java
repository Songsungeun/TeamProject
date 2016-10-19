package honey.service;

import java.util.List;

import honey.vo.HoneyMain;



public interface HoneyParentComentService {
  List<HoneyMain> getParentComent(int no,int pageNo, int length) throws Exception;
  void insertPComent(HoneyMain honeyMain) throws Exception;
  void updatePComent(HoneyMain honeyMain) throws Exception;
  void deletePComent(int no) throws Exception;
}
