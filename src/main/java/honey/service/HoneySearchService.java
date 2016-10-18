package honey.service;

import java.util.List;

import honey.vo.HoneySearchKeyword;

public interface HoneySearchService {
	List<HoneySearchKeyword> honeySearcher(HoneySearchKeyword value) throws Exception;
}
