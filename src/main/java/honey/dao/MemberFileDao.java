package honey.dao;

import java.util.List;

import honey.vo.MemberFile;

public interface MemberFileDao {
  int prifileFileinsert (MemberFile profileFile);
  List<MemberFile> getprofileFileName(int memberNo);
}
