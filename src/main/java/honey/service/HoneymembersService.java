package honey.service;

import java.util.List;

import honey.vo.HoneyMembers;
import honey.vo.honey_boards;

public interface HoneymembersService {
	public void singUpMembers(HoneyMembers members) throws Exception;
	public void unregister(int memberNo) throws Exception;
	public void memberInfoUpdate(HoneyMembers members) throws Exception;
	public void modifyPassword(HoneyMembers members) throws Exception;
	public String getProfileFileName(int memberNo) throws Exception;
	public HoneyMembers getUserNumber(String nickName) throws Exception;
	public List<honey_boards> getBoards(int memberNo) throws Exception;
}