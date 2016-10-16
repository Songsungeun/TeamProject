package honey.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.tempDao;
import honey.service.HoneyBoardService;
import honey.vo.honey_boards;

@Service
public class DefaultHoneyBoardService implements HoneyBoardService {
	@Autowired tempDao boardDao;
	
	@Override
	public int insertBoard(honey_boards board) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public honey_boards getBoard(int no) throws Exception {
		return boardDao.selectOne(no);
	}

	@Override
	public int updateBoard(honey_boards board) throws Exception {
		return boardDao.update(board);
	}

	@Override
	public int deleteBoard(int no) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
