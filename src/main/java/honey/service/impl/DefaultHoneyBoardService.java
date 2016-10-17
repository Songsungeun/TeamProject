package honey.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.tempDao;
import honey.service.HoneyBoardService;
import honey.vo.honey_boards;

@Service
public class DefaultHoneyBoardService implements HoneyBoardService {
	@Autowired tempDao boardDao;
	
	@Override
	public void insertBoard(honey_boards board) throws Exception {
		boardDao.insert(board);
	}

	@Override
	public honey_boards getBoard(int no) throws Exception {
		return boardDao.selectOne(no);
	}

	@Override
	public void updateBoard(honey_boards board) throws Exception {
		
		HashMap<String,Object> paramMap = new HashMap<>();
	      paramMap.put("no", board.getNo());
	      
	      if (boardDao.selectOne(board.getNo()) == null) {
	        throw new Exception("해당 게시물이 없습니다.");
	      }
	      boardDao.update(board);
	}

	@Override
	public void deleteBoard(int no) throws Exception {
		HashMap<String,Object> paramMap = new HashMap<>();
	      paramMap.put("no", no);
	      
	      if (boardDao.selectOne(no) == null) {
	        throw new Exception("해당 게시물이 없습니다.");
	      }
	      boardDao.delete(no);
	}
	
}
