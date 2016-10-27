package honey.dao;

import honey.vo.HoneyMemberPhoto;

public interface HoneyPhotoDao {
  HoneyMemberPhoto extractUserNum(int value) throws Exception;
  HoneyMemberPhoto extractMemberNum(String value) throws Exception;

}