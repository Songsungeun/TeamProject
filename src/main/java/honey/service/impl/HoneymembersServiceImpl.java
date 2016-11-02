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
import honey.vo.UrlInfo;

@Service
public class HoneymembersServiceImpl implements HoneymembersService {
	@Autowired HoneyMembersDao hMembersDao;
	@Autowired MemberFileDao fileDao;
	@Autowired MemberFileDao memberFileDao;
	@Autowired HoneyMainUrlDao hUrnDao;
	
	public void singUpMembers(HoneyMembers members) throws Exception {
		hMembersDao.joinMember(members);
		fileDao.defaultProfilePhotoInsert(members.getMemberNo());
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
		try {
		MemberFile fileInfo =  memberFileDao.getprofileFile(memberNo);
		return fileInfo.getFilename();
		} catch (Exception e) {
		 e.printStackTrace();
		 return e.getMessage();
		}
	}

	public HoneyMembers getUserNumber(String nickName) throws Exception {
		try {
			HoneyMembers hMember = new HoneyMembers();
			hMember = hMembersDao.selectUserNumber(nickName);
			System.out.println(hMember);
			return hMember;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<HoneyMain> getBoards(int memberNo) throws Exception {
		try {
			List<HoneyMain> boards = hMembersDao.selectBoards(memberNo);
			return boards;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
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
}