package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyMembers;
import honey.vo.HoneySearchKeyword;

public interface HoneySearcherDao {
	List<HoneySearchKeyword> selectFromBoard(String value) throws Exception;
	List<HoneySearchKeyword> selectFromMembers(String value) throws Exception;
}