package honey.dao;

import java.util.List;

import honey.vo.HoneyBoardFile;

public interface HoneyBoardFileDao {

	int boardPhotoInsert(HoneyBoardFile boardFile);
	List<HoneyBoardFile> fileList(int memberNo);
	int updateFile(HoneyBoardFile boardFile);
}
