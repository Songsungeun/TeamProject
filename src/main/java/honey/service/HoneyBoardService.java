package honey.service;

import org.springframework.web.multipart.MultipartFile;

import honey.vo.UrlInfo;
import honey.vo.honey_boards;

public interface HoneyBoardService {
	void insertBoard(honey_boards board /*MultipartFile file1, MultipartFile file2,*/ ) throws Exception;
	honey_boards getBoard(int no) throws Exception;
	void updateBoard(honey_boards board) throws Exception;
	void deleteBoard(int no) throws Exception;
	void insertUrl(UrlInfo url) throws Exception;  
}
