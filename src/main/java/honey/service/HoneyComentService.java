package honey.service;

import java.util.List;

import honey.vo.HoneyComent;



public interface HoneyComentService {
  List<HoneyComent> getComent(int boardNo,int pageNo, int length) throws Exception;
  HoneyComent detailComent(int cmtNo) throws Exception;
  void insertComent(HoneyComent honeyComent) throws Exception;
  void insertChildComent(HoneyComent honeyComent) throws Exception;
  void saveCometNo(HoneyComent honeyComent) throws Exception;
  void updateComent(HoneyComent honeyComent) throws Exception;
  void deleteComent(int cmtNo) throws Exception;
  void childDeleteComent(int cmtNo) throws Exception;
}
