package honey.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyMainUrlDao;
import honey.dao.HoneyMembersDao;
import honey.dao.MemberFileDao;
import honey.service.HoneymembersService;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.MemberFile;
import honey.vo.Messages;
import honey.vo.UrlInfo;

@Service
public class HoneymembersServiceImpl implements HoneymembersService {
	@Autowired HoneyMembersDao hMembersDao;
	@Autowired MemberFileDao memberFileDao;
	@Autowired HoneyMainUrlDao hUrnDao;

	public void singUpMembers(HoneyMembers members) throws Exception {
		hMembersDao.joinMember(members);
		memberFileDao.defaultProfilePhotoInsert(members.getMemberNo());
	}

	public void unregister(int memberNo) throws Exception {
		hMembersDao.unregisteMember(memberNo);
	}

	public void memberInfoUpdate(HoneyMembers members) throws Exception {
		hMembersDao.userInfoUpdate(members);
	}

	public void modifyPassword(HoneyMembers members) throws Exception {
		hMembersDao.changePassword(members);
	}

	public String getProfileFileName(int memberNo) throws Exception {
		MemberFile fileInfo =  memberFileDao.getprofileFile(memberNo);
		return fileInfo.getFilename();
	}

	public HoneyMembers getUserNumberByNickName(String nickName) throws Exception {
		HoneyMembers hMember = new HoneyMembers();
		hMember = hMembersDao.selectUserNumberByNickName(nickName);
		return hMember;
	}

	@Override
	public List<HoneyMain> getBoards(int memberNo) throws Exception {
		List<HoneyMain> boards = hMembersDao.selectBoards(memberNo);
		return boards;
	}

	@Override
	public int followMemberInsert(HoneyMembers follower) throws Exception {
		return hMembersDao.followInsert(follower);
	}

	@Override
	public List<HoneyMembers> followChecker(HoneyMembers follower) throws Exception {
		List<HoneyMembers> checker = hMembersDao.selectFollowUser(follower);
		return checker;
	}

	@Override
	public List<HoneyMembers> getFollowers(int memberNo) throws Exception {

		List<HoneyMembers> followCollector = hMembersDao.selectFollowCount(memberNo);
		return followCollector;
	}

	@Override
	public List<HoneyMembers> getGuider(int memberNo) throws Exception {
		HoneyMembers temp = new HoneyMembers();
		temp.setFollowMemberNo(memberNo);
		List<HoneyMembers> followCollector = hMembersDao.selectGuider(temp.getFollowMemberNo());
		return followCollector;
	}

	@Override
	public void followDisconnector(HoneyMembers follower) throws Exception {
		hMembersDao.disconnector(follower);

	}

	@Override
	public List<UrlInfo> userUrlCollector(int memberNo) throws Exception {
		return hUrnDao.selectUserUrlList(memberNo);
	}

	@Override
	public HoneyMembers getEmailCheck(String member) throws Exception {
		return hMembersDao.emailCheck(member);
	}

	@Override
	public HoneyMembers getUserInfo(int memberNo) {
		HoneyMembers memberInfo = hMembersDao.selectOneByMemberNo(memberNo);
		MemberFile mf = memberFileDao.getprofileFile(memberNo);
		memberInfo.setProfileFileName(mf.getFilename());
		return memberInfo;
	}

	@Override
	public void insertIntoMessage(Messages messageContents) {
		hMembersDao.sendMessage(messageContents);
	}

	@Override
	public List<HoneyMembers> getMessagesSendUserByLoginUserNo(int loginUserNo) {

		return hMembersDao.selectMessagesByLoginUserNo(loginUserNo); 
	}

	@Override
	public List<Messages> getMessagesByUserNo(int memberNo, int loginUserNo) {
		Messages temp = new Messages();
		temp.setLoginUserNo(memberNo);
		temp.setMessageTargetUserNo(loginUserNo);
		List<Messages> messageList = hMembersDao.selectMessagesByUserNo(temp);
		return messageList;
	}

	@Override
	public int getNewMessagesNum(int memberNo) {
		List<Messages> newMessageNum = hMembersDao.selectMessageStatusZeroByUserNo(memberNo);
	    int messageNum = newMessageNum.size();
	    return messageNum;
	}

	@Override
	public void updateMessageStatus(int messageNo) {
		hMembersDao.messageStatusUpdate(messageNo);
		
	}


}