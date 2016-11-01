package honey.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyBoardFileDao;
import honey.dao.tempDao;
import honey.service.HoneyBoardService;
import honey.vo.HoneyBoardFile;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

@Service("HoneyBoardService")
public class DefaultHoneyBoardService implements HoneyBoardService {
	@Autowired tempDao boardDao;
	@Autowired HoneyBoardFileDao boardFileDao;
	
	public void insertBoard(honey_boards board
//			MultipartFile file1,
//			MultipartFile file2,
			) throws Exception {
		boardDao.insert(board);
		//String newFilename = null;
		/*
		if (!file1.isEmpty()) {
			newFilename = FileUploadUtil1.getNewFilename(file1.getOriginalFilename());
			file1.transferTo(new File(uploadDir + newFilename));
			HoneyBoardFile boardFile = new HoneyBoardFile();
			boardFile.setBoardNo(board.getNo());
			boardFile.setFileName(newFilename);
			boardFileDao.insert(boardFile);
		}
		
		if (!file2.isEmpty()) {
			newFilename = FileUploadUtil1.getNewFilename(file1.getOriginalFilename());
			file2.transferTo(new File(uploadDir + newFilename));
			HoneyBoardFile boardFile = new HoneyBoardFile();
			boardFile.setBoardNo(board.getNo());
			boardFile.setFileName(newFilename);
			boardFileDao.insert(boardFile);
		}*/
	}
	public void insertUrl(UrlInfo urlInfo) throws Exception {
		boardDao.insertUrl(urlInfo);
	}
	
	public honey_boards getBoard(int no) throws Exception {
		return boardDao.selectOne(no);
	}

	public void updateBoard(honey_boards board) throws Exception {
		
		HashMap<String,Object> paramMap = new HashMap<>();
	      paramMap.put("no", board.getNo());
	      
	      if (boardDao.selectOne(board.getNo()) == null) {
	        throw new Exception("해당 게시물이 없습니다.");
	      }
	      boardDao.update(board);
	}

	public void deleteBoard(int no) throws Exception {
		
	      boardDao.delete(no);
	}
	
	public void insertBoardFile(HoneyBoardFile boardFile) throws Exception {
		System.out.println("insert 시");
		boardFileDao.boardPhotoInsert(boardFile);
	}
	
}
