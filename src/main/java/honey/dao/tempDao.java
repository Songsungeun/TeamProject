package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.honey_boards;



public interface tempDao {
  List<honey_boards> selectList(Map<String, Object> paramMap) throws Exception;
  
  honey_boards selectOne(int no) throws Exception;
  
  honey_boards selectOneByPassword(Map<String, Object> paramMap) throws Exception;
  
  int insert(honey_boards board) throws Exception;
  
  int update(honey_boards board) throws Exception;
  
  int delete(int no) throws Exception;
  
}
