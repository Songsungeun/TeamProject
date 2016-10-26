package honey.dao;

import honey.vo.HoneyBoardFile;

public interface HoneyBoardFileDao {

	int prifileFileinsert (HoneyBoardFile boardFile);
  List<HoneyBoardFile> getBoardFileName(int boardNo);
  int defaultboardPhotoInsert(int boardNo);
}
