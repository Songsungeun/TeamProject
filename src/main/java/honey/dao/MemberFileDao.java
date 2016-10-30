package honey.dao;

import java.util.List;

import honey.vo.MemberFile;

public interface MemberFileDao {
  int prifileFileinsert (MemberFile profileFile);
  MemberFile getprofileFile(int memberNo);
  List<MemberFile> getprofileFileName(int memberNo);
  int defaultProfilePhotoInsert(int memberNo);
}
