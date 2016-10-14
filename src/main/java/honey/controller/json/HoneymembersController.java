package honey.controller.json;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import honey.dao.HoneyMembersDao;
import honey.service.MemberService;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;

@Controller
@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/"})
public class HoneymembersController {
	@Autowired HoneyMembersDao hMembersDao;
	//@Autowired MemberService memberService;

	@RequestMapping(path="joinMember")
	public Object joinMember(HoneyMembers board) throws Exception {
		try {
			//memberService.signUpMember(board)
			hMembersDao.joinMember(board);
			return JsonResult.success();
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="unregisteMember")
	public Object unregister(HttpSession session) throws Exception {
		session.invalidate();

		try {
			HoneyMembers hMembers= (HoneyMembers)session.getAttribute("member");
			//memberService.unregisteMember(hMembers.getMemberNo());
			hMembersDao.unregisteMember(hMembers.getMemberNo());
			return JsonResult.success();
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}


	@RequestMapping(path="userInfoDetail")
	public Object userInfoDetail (HttpSession session) throws Exception {
		try {
			HoneyMembers hMembers = (HoneyMembers)session.getAttribute("member");
			
			if(hMembers == null) {
				System.out.println("해당 회원 정보가 없습니다.");
			}
			return JsonResult.success(hMembers);
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="userStatusUpdate")
	public Object userStatusUpdate(HoneyMembers hmember, HttpSession session) throws Exception {
		System.out.println("hiyo" + hmember);
		try {
			HoneyMembers honeymembers =(HoneyMembers)session.getAttribute("member");
			hmember.setMemberNo(honeymembers.getMemberNo());
			hMembersDao.userInfoUpdate(hmember);
			hmember.setPassword(honeymembers.getPassword());
			session.setAttribute("member", hmember);
			return JsonResult.success();
		} catch(Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="changePassword")
	public Object changePassword(HoneyMembers hMember, HttpSession session) throws Exception {
		System.out.println("hi i m hMember" + hMember);
		try {
			HoneyMembers honeyMemebers = (HoneyMembers)session.getAttribute("member");
			hMember.setMemberNo(honeyMemebers.getMemberNo());
			hMembersDao.changePassword(hMember);
			hMember.setEmail(honeyMemebers.getEmail());
			hMember.setMemberNo(honeyMemebers.getMemberNo());
			hMember.setNickname(honeyMemebers.getNickname());
			hMember.setPhone(honeyMemebers.getPhone());
			hMember.setUserBirthDay(honeyMemebers.getUserBirthDay());
			hMember.setUserName(honeyMemebers.getUserName());
			session.setAttribute("member", hMember);
			return JsonResult.success();
		} catch(Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}
}