package honey.dao;

import java.util.HashMap;
import java.util.List;

import honey.vo.HoneyBoardFile;

public interface HoneyBoardFileDao {

	int boardPhotoInsert(HoneyBoardFile boardFile);
	List<HoneyBoardFile> fileList(HashMap <String,Object> map);
	List<HoneyBoardFile> otherUserReturnMethod(int memberNo); 
	int updateFile(HoneyBoardFile boardFile);
	int fileInsert(HoneyBoardFile boardFile);
	int countAll(int memberNo);
  int fileDelete(int fileNo);
}
