package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.UrlInfo;

public interface HoneyMainUrlDao {

	UrlInfo selectOne(int no) throws Exception;
	List<UrlInfo> selectList() throws Exception;
	List<UrlInfo> selectUserUrlList(int memberNo) throws Exception;
}
