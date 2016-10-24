package honey.dao;

import honey.vo.UrlInfo;

public interface HoneyMainUrlDao {

	UrlInfo selectOne(int no) throws Exception;
}
