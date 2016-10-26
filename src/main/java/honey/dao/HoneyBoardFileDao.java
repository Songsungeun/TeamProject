package honey.dao;

import honey.vo.HoneyBoardFile;

public interface HoneyBoardFileDao {

	int prifileFileinsert (HoneyBoardFile boardFile);
  int defaultboardPhotoInsert(int boardNo);
}
