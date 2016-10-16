package honey.service;

import honey.vo.honey_boards;

public interface HoneyBoardService {
	int insertBoard(honey_boards board) throws Exception;
	honey_boards getBoard(int no) throws Exception;
	int updateBoard(honey_boards board) throws Exception;
	int deleteBoard(int no) throws Exception;
	  
	
}
