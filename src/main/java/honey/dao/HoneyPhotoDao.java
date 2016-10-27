package honey.dao;

import java.util.List;

import honey.vo.HoneyMemberPhoto;

public interface HoneyPhotoDao {
  List<HoneyMemberPhoto> extractMemberNum(String value) throws Exception;
  HoneyMemberPhoto extractUserNum(int value) throws Exception;

}