package honey.service;

import honey.vo.honey_boards;

public interface HoneyBoardService {
	void insertBoard(honey_boards board) throws Exception;
	honey_boards getBoard(int no) throws Exception;
	void updateBoard(honey_boards board) throws Exception;
	void deleteBoard(int no) throws Exception;
	  
	
}
