package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyBoard;

public interface HoneyBoardDao {
  List<HoneyBoard> selectList(Map<String,Object> paramMap) throws Exception;
}








