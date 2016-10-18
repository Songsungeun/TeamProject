package honey.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.HoneyMembersDao;
import honey.service.HoneymembersService;
import honey.vo.HoneyMembers;

@Service
public class HoneymembersServiceImpl implements HoneymembersService {
	@Autowired HoneyMembersDao hMembersDao;

	public void singUpMembers(HoneyMembers members) throws Exception {
		hMembersDao.joinMember(members);
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
}