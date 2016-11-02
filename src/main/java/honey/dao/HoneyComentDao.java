package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyComent;



public interface HoneyComentDao {
  List<HoneyComent> comentList(Map<String, Object> paramMap) throws Exception;
  HoneyComent comentDetail(int no) throws Exception;
  int insertComent(HoneyComent honeyComent) throws Exception;
  int insertChildComent(HoneyComent honeyComent) throws Exception;
  int saveCometNo(HoneyComent honeyComent) throws Exception;
  int updateComment(HoneyComent honeyComent) throws Exception;
  int delete(int cmtNo) throws Exception;
  int childdelete(int cmtNo) throws Exception;
}
