package honey.controller.json;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import honey.dao.MemberFileDao;
import honey.service.HoneymembersService;
import honey.util.FileUploadUtil;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.MemberFile;
import honey.vo.Messages;
import honey.vo.UrlInfo;

@Controller
@RequestMapping({"/mainpage/", "/writepage/", "/adminpage/","/membership/","/resultOfSearch/"})
public class HoneymembersController {
	@Autowired HoneymembersService hMembersService;
	@Autowired ServletContext sc;
	@Autowired MemberFileDao memberFileDao;

	@RequestMapping(path="joinMember")
	public Object joinMember(HoneyMembers members) throws Exception {
		try {
			hMembersService.singUpMembers(members);
			return JsonResult.success();
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="facebookLoginMember")
	public Object facebookLoginMember(HoneyMembers members) throws Exception {
		if (members.getPassword() == null) {
			members.setPassword(members.getEmail());
			members.setNickname(members.getUserName());
			members.setPhone(" ");
			hMembersService.singUpMembers(members);
			HoneyMembers facebookMember = hMembersService.getUserNumberByNickName(members.getNickname());
			MemberFile profileFile = new MemberFile();
			profileFile.setFilename(members.getEmail());
			profileFile.setMemberNo(facebookMember.getMemberNo());
			memberFileDao.prifileFileinsert(profileFile);
			return JsonResult.success();
		} else {
			try {
				hMembersService.singUpMembers(members);
				return JsonResult.success();
			} catch (Exception e) {
				e.printStackTrace();
				return JsonResult.fail(e.getMessage());
			} }
	}

	@RequestMapping(path="unregisteMember")
	public Object unregister(HttpSession session) throws Exception {
		try {
			HoneyMembers hMembers= (HoneyMembers)session.getAttribute("member");
			hMembersService.unregister(hMembers.getMemberNo());
			session.invalidate();
			return JsonResult.success();
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}


	@RequestMapping(path="userInfoDetail")
	public Object userInfoDetail (HttpSession session) throws Exception {
		// 이 메서드는 DB에서 작업할 일이 없어서 service 클래스에서 따로 구현할 필요가 없을 것 같다.
		try {
			HoneyMembers hMembers = (HoneyMembers)session.getAttribute("member");

			if(hMembers == null) {
				System.out.println("해당 회원 정보가 없습니다.");
			}
			HoneyMembers user = hMembersService.getUserInfo(hMembers.getMemberNo());
			return JsonResult.success(user);
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="userStatusUpdate")
	public Object userStatusUpdate(HoneyMembers hmember, HttpSession session) throws Exception {

		try {
			HoneyMembers honeymembers =(HoneyMembers)session.getAttribute("member");
			hmember.setMemberNo(honeymembers.getMemberNo());
			hMembersService.memberInfoUpdate(hmember);
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
		try {
			HoneyMembers honeyMemebers = (HoneyMembers)session.getAttribute("member");
			hMember.setMemberNo(honeyMemebers.getMemberNo());
			hMembersService.modifyPassword(hMember);
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

	@RequestMapping(value = "/profileFileUpload", method = RequestMethod.POST)
	@ResponseBody
	public String upload(MultipartHttpServletRequest req, 
			HttpServletResponse res, HttpSession session) throws IOException {
		String uploadDir = sc.getRealPath("/upload") + "/";
		Iterator<String> itr =  req.getFileNames();
		/* Iterator : 모든 컬랙션으로부터 정보를 얻을 수 있는 인터페이스
		 */
		MultipartFile mpf = req.getFile(itr.next());
		String originFileName = mpf.getOriginalFilename();

		String newFilename = null;
		if (mpf != null && ! mpf.isEmpty()) {
			newFilename = FileUploadUtil.getNewFilename(originFileName);
			mpf.transferTo(new File(uploadDir + newFilename));
			MemberFile profileFile = new MemberFile();
			profileFile.setFilename(newFilename);
			HoneyMembers honeymembers =(HoneyMembers)session.getAttribute("member");
			profileFile.setMemberNo(honeymembers.getMemberNo());

			memberFileDao.prifileFileinsert(profileFile);
		}

		return "{\"code\":\"1\", \"msg\":\"file upload success.\",\"data\":\""+newFilename+"\"}";
	}

	@RequestMapping(path="userProfileFileLoder")
	public Object profileFileLoder (HttpSession session) {
		try {
			HoneyMembers honeyMember = (HoneyMembers)session.getAttribute("member");
			MemberFile memberFile = new MemberFile();
			memberFile.setFilename(hMembersService.getProfileFileName(honeyMember.getMemberNo()));
			return JsonResult.success(memberFile.getFilename());
		} catch(Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="otherUserInfoDetail")
	public Object otherUserInfoLoder(HoneyMembers userInfo) {
		try {
			HoneyMembers honeyMember = hMembersService.getUserNumberByNickName(userInfo.getNickname());
			HoneyMembers member = hMembersService.getUserInfo(honeyMember.getMemberNo());
			MemberFile memberFile = new MemberFile();
			memberFile.setFilename(hMembersService.getProfileFileName(honeyMember.getMemberNo()));
			List<HoneyMain> list = hMembersService.getBoards(honeyMember.getMemberNo());
			List<HoneyMembers> followCollector = hMembersService.getFollowers(honeyMember.getMemberNo());
			List<UrlInfo> urlCollect = hMembersService.userUrlCollector(honeyMember.getMemberNo());
			for (int i = 0; i < list.size(); i++) {
				list.get(i).setUserProfilePath(memberFile.getFilename());
			}
			List<HoneyMain> OtherUserInfo = SetImage.setImage(list, urlCollect);

			for (int i = 0; i < OtherUserInfo.size(); i++) {
			}
			int totalViewCount = 0;
			int totalLikeCount = 0;
			for (HoneyMain count : list) {
				totalViewCount += count.getViewCount();
				totalLikeCount += count.getLike();
			}
			HashMap<String,Object> resultMap = new HashMap<>();
			resultMap.put("profilePhoto", memberFile.getFilename());
			resultMap.put("userInfo", member.getIntroduce());
			resultMap.put("boardInfo", OtherUserInfo);
			resultMap.put("totalViewCount", totalViewCount);
			resultMap.put("totalFollowers", followCollector.size());
			resultMap.put("totalLikeCount", totalLikeCount);
			return JsonResult.success(resultMap);
		} catch(Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}
	@RequestMapping(path="otherUserFollow")
	public Object otherUserFollow(HoneyMembers memberNo, HttpSession session) throws Exception {
		try {
			HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
			if(loginUser.getEmail() == null) {
				throw new RuntimeException();
			}
			HoneyMembers follower = new HoneyMembers();
			follower.setFollowMemberNo(loginUser.getMemberNo());
			follower.setMemberNo(memberNo.getMemberNo());
			follower.setNickname(loginUser.getNickname());
			HoneyMembers member = new HoneyMembers();
			List<HoneyMembers> memberInfo = new ArrayList<>();
			try {
				hMembersService.followMemberInsert(follower);
				member = hMembersService.getUserInfo(memberNo.getMemberNo());
			}catch (Exception e) {
				int i = 0;
				return JsonResult.fail(i, e.getMessage());
			}
			// db 테이블 컬럼명이 mb_no, mb_no2 로 지어져 있는데
			// mb_no를 게시글 작성자 번호로, mb_no2를 로그인한 회원 번호로 인서트 할 것이다.
			memberInfo.add(member);
			return JsonResult.success(memberInfo);
		} catch (RuntimeException e) {
			return JsonResult.fail(e.getMessage());
		} 
	}

	@RequestMapping(path="checkingFollow")
	public Object checkingFollow(HoneyMembers memberNo, HttpSession session) throws Exception {
		try {
			HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
			if(loginUser.getEmail() == null) {
				throw new RuntimeException();
			}
			HoneyMembers follower = new HoneyMembers();
			follower.setFollowMemberNo(loginUser.getMemberNo());
			follower.setNickname(loginUser.getNickname());
			follower.setMemberNo(memberNo.getMemberNo());
			try {
				List<HoneyMembers> checker = hMembersService.followChecker(follower);
				if(checker.isEmpty()) {
					int i = 0;
					return JsonResult.fail(i);
				} else {
					throw new Exception();
				}
			} catch (Exception e) {
				return JsonResult.success();
			}
		} catch (RuntimeException e) {
			return JsonResult.fail(e.getMessage());
		} 
	}

	@RequestMapping(path="followDisconnect")
	public Object followDisconnect(HoneyMembers memberNo, HttpSession session) throws Exception {
		try {
			HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
			HoneyMembers follower = new HoneyMembers();
			follower.setFollowMemberNo(loginUser.getMemberNo());
			follower.setMemberNo(memberNo.getMemberNo());
			hMembersService.followDisconnector(follower);
			return JsonResult.success();
		} catch (RuntimeException e) {
			return JsonResult.fail(e.getMessage());
		} 

	}

	@RequestMapping(path="emailCheck")
	public Object emailCheck(String email) throws Exception {
		try {
			if (hMembersService.getEmailCheck(email) == null) {
				return JsonResult.success();
			} else {
				return JsonResult.fail();
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		} 
	}

	@RequestMapping("messageUserLode")
	public Object messageUserLode(HttpSession session) throws Exception {
		try {
			HoneyMembers member = (HoneyMembers)session.getAttribute("member");
			Messages messages = new Messages();
			messages.setLoginUserNo(member.getMemberNo());
			List<HoneyMembers> messageUserList = hMembersService.getMessagesSendUserByLoginUserNo(messages.getLoginUserNo());

			for(int i =0; i < messageUserList.size();i++) {
				String[] messageUserPhoto = (messageUserList.get(i).getProfileFilePath()).split("\\.");
				if(messageUserPhoto.length == 2) {
					messageUserList.get(i).setProfileFilePath("/TeamProject/upload/" + messageUserPhoto[0] + "." + messageUserPhoto[1]);
				} else {
					messageUserList.get(i).setProfileFilePath("http://graph.facebook.com/" + messageUserPhoto[0] + "/picture");
				}
			}
			return JsonResult.success(messageUserList);
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping("messageContentsLode")
	public Object messageContensLode(int memberNo, HttpSession session) throws Exception {
		HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
		try {
			List<Messages> messageList = hMembersService.getMessagesByUserNo(memberNo, loginUser.getMemberNo());
			System.out.println(messageList.get(0).getInsertDate());
			System.out.println(messageList.get(0).getInsertDate2());

			return JsonResult.success(messageList);
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping("sendMessage")
	public Object sendMessage(Messages messageContents, HttpSession session) throws Exception {

		try {
			HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
			messageContents.setLoginUserNo(loginUser.getMemberNo());
			HoneyMembers sendUser = hMembersService.getUserNumberByNickName(messageContents.getNickName());
			messageContents.setMessageTargetUserNo(sendUser.getMemberNo());
			hMembersService.insertIntoMessage(messageContents);
			return JsonResult.success();
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping("newMessageAlam")
	public Object newMessageAlam(HttpSession session) throws Exception{
		HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
		try {
			int newMessageNum = hMembersService.getNewMessagesNum(loginUser.getMemberNo());
			return JsonResult.success(newMessageNum);
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping("updateMessageStatus")
	public Object updateMessageStatus(Messages messageNo) throws Exception {
		try {
			hMembersService.updateMessageStatus(messageNo.getMessageNo());
			return JsonResult.success();
		} catch(Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}


}