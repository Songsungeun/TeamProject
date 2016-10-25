package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyComent;
import honey.vo.HoneyMain;



public interface HoneyComentDao {
  List<HoneyComent> comentList(Map<String, Object> paramMap) throws Exception;
  HoneyComent comentDetail(int no) throws Exception;
  int insertComent(HoneyComent honeyComent) throws Exception;
  int updateComment(HoneyComent honeyComent) throws Exception;
  int delete(int cmtNo) throws Exception;
}
