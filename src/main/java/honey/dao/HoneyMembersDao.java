package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyMembers;
import honey.vo.honey_boards;

public interface HoneyMembersDao {
  int joinMember(HoneyMembers honeyMembers) throws Exception;
  int unregisteMember(int no) throws Exception;
  HoneyMembers selectOneByEmailAndPassword(Map<String, Object> paramMap);
  HoneyMembers selectUserInfo(int no);
  int userInfoUpdate(HoneyMembers hmember);
  int changePassword(HoneyMembers hmember);
  HoneyMembers selectUserNumber(String nickName);
  List<honey_boards> selectBoards(int memberNo);
  HoneyMembers extractMemberNum(String value) throws Exception;

}
