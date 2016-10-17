package honey.service;

import honey.vo.HoneyMembers;

public interface HoneymembersService {
	public void singUpMembers(HoneyMembers members) throws Exception;
	public void unregister(int memberNo) throws Exception;
	public void memberInfoUpdate(HoneyMembers members) throws Exception;
	public void modifyPassword(HoneyMembers members) throws Exception;
}