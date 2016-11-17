package honey.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import honey.vo.HoneySearchKeyword;

public interface HoneySearchService {
	List<HoneySearchKeyword> searchServiceBoardResult(String searchValue, int boardLength) throws Exception;
	List<HoneySearchKeyword> searchServiceMemberResult(String searchValue, int memberLength) throws Exception;
	List<HoneySearchKeyword> searchServiceFileResult(String searchValue , int fileLength) throws Exception;
	List<HoneySearchKeyword> memberResultTotalPage(String searchValue) throws Exception;
	List<HoneySearchKeyword> boardResultTotalPage(String searchValue) throws Exception;
	List<HoneySearchKeyword> FileResultTotalPage(String searchValue) throws Exception;
	List<HoneySearchKeyword> autoSearchValue() throws Exception;
}
