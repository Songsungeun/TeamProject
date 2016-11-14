package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.Messages;
import honey.vo.honey_boards;

public interface HoneyMembersDao {
  int joinMember(HoneyMembers honeyMembers) throws Exception;
  int unregisteMember(int no) throws Exception;
  HoneyMembers selectOneByEmailAndPassword(Map<String, Object> paramMap) throws Exception;
  HoneyMembers selectUserInfo(int no) throws Exception;
  int userInfoUpdate(HoneyMembers hmember) throws Exception;
  int changePassword(HoneyMembers hmember) throws Exception;
  HoneyMembers selectUserNumberByNickName(String nickName) throws Exception;
  HoneyMembers selectUserNickName(int memberNo) throws Exception;
  List<HoneyMain> selectBoards(int memberNo) throws Exception;
  int followInsert(HoneyMembers follower) throws Exception;
  List<HoneyMembers> selectFollowUser(HoneyMembers follower) throws Exception;
  List<HoneyMembers> selectFollowCount(int memberNo) throws Exception;
  List<HoneyMembers> selectGuider(int memberNo) throws Exception;
  int disconnector(HoneyMembers follower) throws Exception;
  HoneyMembers emailCheck(String email) throws Exception;
  HoneyMembers selectOneByMemberNo(int memberNo);
  int sendMessage(Messages messageContents);
  List<HoneyMembers> selectMessagesByLoginUserNo(int loginUserNo);
  List<Messages> selectMessagesByUserNo(Messages temp);
  List<Messages> selectMessageStatusZeroByUserNo(int memberNo);
  void messageStatusUpdate(int messageNo);
}
