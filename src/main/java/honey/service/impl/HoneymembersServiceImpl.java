package honey.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyMembersDao;
import honey.dao.MemberFileDao;
import honey.service.HoneymembersService;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.MemberFile;
import honey.vo.honey_boards;

@Service
public class HoneymembersServiceImpl implements HoneymembersService {
	@Autowired HoneyMembersDao hMembersDao;
	@Autowired MemberFileDao fileDao;
	@Autowired MemberFileDao memberFileDao;
	
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
		List<MemberFile> list =  memberFileDao.getprofileFileName(memberNo);
		MemberFile memberFile = new MemberFile();
		int i = 0;
		for (i = 0; i < list.size(); i++) {
			i = list.size();
		}
		memberFile = list.get(i-2);
		return memberFile.getFilename();
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
	public void followDisconnector(HoneyMembers follower) throws Exception {
		hMembersDao.disconnector(follower);
		
	}
}