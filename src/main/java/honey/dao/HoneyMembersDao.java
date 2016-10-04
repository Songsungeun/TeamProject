package honey.dao;

import java.util.Map;

import honey.vo.HoneyMembers;

public interface HoneyMembersDao {
  int joinMember(HoneyMembers honeyMembers) throws Exception;
  int unregisteMember(int no) throws Exception;
  HoneyMembers selectOneByEmailAndPassword(Map<String, Object> paramMap);
  
  
}
