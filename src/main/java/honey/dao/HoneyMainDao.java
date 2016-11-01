package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.FileList;
import honey.vo.HoneyMain;



public interface HoneyMainDao {
  List<HoneyMain> selectList(Map<String, Object> paramMap) throws Exception;
  List<HoneyMain> popularList(Map<String, Object> paramMap) throws Exception;
  List<HoneyMain> selectListandCategory(Map<String, Object> paramMap) throws Exception;
  List<FileList> fileList (int no) throws Exception;
  
  HoneyMain selectOne(int no) throws Exception;
  
  HoneyMain selectOneByPassword(Map<String, Object> paramMap) throws Exception;
  
  int insert(HoneyMain honeyMain) throws Exception;
  
  int increaseViewCount(int no) throws Exception;
  
  int increase_Like(int no) throws Exception;
  
  int decrease_Like(int no) throws Exception;
  
  int delete(int no) throws Exception;
  
}
