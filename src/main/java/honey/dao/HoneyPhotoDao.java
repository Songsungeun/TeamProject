package honey.dao;

import honey.vo.HoneyMemberPhoto;
import honey.vo.HoneyMembers;

public interface HoneyPhotoDao {
  HoneyMemberPhoto extractUserNum(int value) throws Exception;

}