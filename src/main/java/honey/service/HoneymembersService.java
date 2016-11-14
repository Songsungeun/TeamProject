package honey.service;

import java.util.List;

import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.Messages;
import honey.vo.UrlInfo;

public interface HoneymembersService {
	public void singUpMembers(HoneyMembers members) throws Exception;
	public void unregister(int memberNo) throws Exception;
	public void memberInfoUpdate(HoneyMembers members) throws Exception;
	public void modifyPassword(HoneyMembers members) throws Exception;
	public String getProfileFileName(int memberNo) throws Exception;
	public HoneyMembers getUserNumberByNickName(String nickName) throws Exception;
	public List<HoneyMain> getBoards(int memberNo) throws Exception;
	public List<HoneyMembers> getFollowers(int memberNo) throws Exception;
	public int followMemberInsert(HoneyMembers follower) throws Exception;
	public List<HoneyMembers> followChecker(HoneyMembers follower) throws Exception;
	public void followDisconnector(HoneyMembers follower) throws Exception;
	public List<UrlInfo> userUrlCollector(int memberNo) throws Exception;
	List<HoneyMembers> getGuider(int memberNo) throws Exception;
	public HoneyMembers getEmailCheck(String member) throws Exception;
	public HoneyMembers getUserInfo(int memberNo);
	public void insertIntoMessage(Messages messageContents);
	public List<HoneyMembers> getMessagesSendUserByLoginUserNo(int loginUserNo);
	public List<Messages> getMessagesByUserNo(int memberNo, int i);
	public int getNewMessagesNum(int memberNo);
	public void updateMessageStatus(int i);
}