package honey.service;

import java.util.List;

import honey.vo.HoneyBoardFile;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

public interface HoneyBoardService {
	void insertBoard(honey_boards board /*MultipartFile file1, MultipartFile file2,*/ ) throws Exception;
	honey_boards getBoard(int no) throws Exception;
	void updateBoard(honey_boards board) throws Exception;
	void deleteBoard(int no) throws Exception;
	void insertUrl(UrlInfo url) throws Exception; 
	void insertBoardFile(HoneyBoardFile boardFile) throws Exception;
	List<HoneyBoardFile> getFileList(int memberNo , int pageLength) throws Exception;
	List<HoneyBoardFile> getFileList(int memberNo) throws Exception;
	void updateUrl(UrlInfo url) throws Exception;
	void updateBoardFile(HoneyBoardFile boardFile) throws Exception;
	void insertFile(HoneyBoardFile boardFile) throws Exception;
	void deleteFile(int fileNo)  throws Exception;
}
