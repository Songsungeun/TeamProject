package honey.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyMembersDao;
import honey.dao.MemberFileDao;
import honey.service.HoneymembersService;
import honey.vo.HoneyMembers;
import honey.vo.MemberFile;

@Service
public class HoneymembersServiceImpl implements HoneymembersService {
	@Autowired HoneyMembersDao hMembersDao;
	@Autowired MemberFileDao fileDao;
	@Autowired MemberFileDao memberFileDao;
	
	public void singUpMembers(HoneyMembers members) throws Exception {
		hMembersDao.joinMember(members);
		System.out.println(members);
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
		System.out.println(i);
		memberFile = list.get(i-2);
		return memberFile.getFilename();
		} catch (Exception e) {
		 e.printStackTrace();
		 return e.getMessage();
		}
	}
}