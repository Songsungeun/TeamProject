package honey.service.impl;

import java.util.HashMap;
import java.util.List;

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
		boardFileDao.boardPhotoInsert(boardFile);
	}

	public List<HoneyBoardFile> getFileList(int memberNo) throws Exception {
		return boardFileDao.otherUserReturnMethod(memberNo);
	}
	
	 public List<HoneyBoardFile> getFileList(int memberNo , int pageLength) throws Exception {
	    HashMap<String,Object> map = new HashMap<>();
	    map.put("memberNo", memberNo);
	    map.put("pageLength", pageLength);
	    return boardFileDao.fileList(map);
	  }
	
	
	public int likeBoardInsert(honey_boards likeBoard) {
		boardDao.insertLikeBoard(likeBoard);
		List<honey_boards> list = boardDao.selectLikeCountByBoardNo(likeBoard.getNo());
		likeBoard.setLike(list.size());
		return boardDao.updateLikeNo(likeBoard);
	}
	public void likeDisconnector(honey_boards no) {
		try {
			boardDao.deleteLike(no);
			List<honey_boards> list = boardDao.selectLikeCountByBoardNo(no.getNo());
			no.setLike(list.size());
			boardDao.updateLikeNo(no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	public List<honey_boards> likeChecker(honey_boards boardLike) {
		List<honey_boards> checker = boardDao.selectLikeBoard(boardLike);
		return checker;
	}

	public void updateUrl(UrlInfo url) throws Exception {
		boardDao.updateUrl(url);
	}
	
	public void updateBoardFile(HoneyBoardFile boardFile) throws Exception {
		boardFileDao.updateFile(boardFile);
	}
	
	public void insertFile(HoneyBoardFile boardFile) throws Exception {
		boardFileDao.fileInsert(boardFile);
	}
	
	public int countFiles(int memberNo) throws Exception{
	  return boardFileDao.countAll(memberNo);
	}
	
  public void deleteFile(int fileNo) throws Exception {
    boardFileDao.fileDelete(fileNo);
  }
	
}
