package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.honey_boards;

public interface HoneyMembersDao {
  int joinMember(HoneyMembers honeyMembers) throws Exception;
  int unregisteMember(int no) throws Exception;
  HoneyMembers selectOneByEmailAndPassword(Map<String, Object> paramMap) throws Exception;
  HoneyMembers selectUserInfo(int no) throws Exception;
  int userInfoUpdate(HoneyMembers hmember) throws Exception;
  int changePassword(HoneyMembers hmember) throws Exception;
  HoneyMembers selectUserNumber(String nickName) throws Exception;
  List<HoneyMain> selectBoards(int memberNo) throws Exception;
  int followInsert(HoneyMembers follower) throws Exception;
  List<HoneyMembers> selectFollowUser(HoneyMembers follower) throws Exception;
  List<HoneyMembers> selectFollowCount(int memberNo) throws Exception;
  int disconnector(HoneyMembers follower) throws Exception;

}
