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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import honey.service.impl.DefaultHoneyBoardService;
import honey.util.FileUploadUtil;
import honey.vo.HoneyBoardFile;
import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

@Controller
@RequestMapping({"/mainpage/", "/writepage/", "/FilePage/"})
public class HoneyBoardController {
	@Autowired DefaultHoneyBoardService boardService;
	@Autowired ServletContext sc;
	honey_boards board = new honey_boards();

	@RequestMapping(path="writeadd")
	public Object add(
			honey_boards board,
			MultipartFile[] files,
			HttpSession session) throws Exception {
		// 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
		try {
			HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
			// 보드 멤버 넘버 셋
			board.setUserNo(hMember.getMemberNo());
			System.out.println("인코딩 확인용: " + board.getTitle());
			if (!board.getYoutubeURL().equals("")) {
				String[] youtubeContents = board.getYoutubeURL().split("/");
				if (board.getYoutubeURL().contains("list")) {
					String[] youtubeList = youtubeContents[3].split("\\?");
					board.setYoutubeURL(youtubeList[0]);
				} else {
					board.setYoutubeURL(youtubeContents[3]);
				}
			} else {
				board.setYoutubeURL(null);
			}

			if (files.length != 0) {
				board.setFileStatus(1);
			} else {
				board.setFileStatus(0);
			}
			boardService.insertBoard(board);

			if (!board.getUrl().equals("")) {
				System.out.println("url start!!!!");
				UrlInfo url = Scrapper.UrlForDB(board.getUrl());
				url.setMb_No(hMember.getMemberNo());
				//url.setBd_No(bd_No);
				//url.setBd_No(boardService.getBoardMax().getNo());
				//System.out.println("no= " + boardService.getBoardMax().getNo());
				boardService.insertUrl(url);
			}

			String newFilename = null;
			if (files.length != 0) {
				for (int i = 0; i < files.length; i++) {
					HoneyBoardFile boardFile = new HoneyBoardFile();
					boardFile.setOriginFileName(files[i].getOriginalFilename());
					newFilename = FileUploadUtil.getNewFilename(files[i].getOriginalFilename());
					boardFile.setFileName(newFilename);
					boardFile.setMb_no(hMember.getMemberNo());
					boardFile.setFileSize(files[i].getSize());
					files[i].transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
					System.out.println("filesize: " + files[i].getSize());
					boardService.insertBoardFile(boardFile);
				} 
			}
			return JsonResult.success();

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="fileadd")
	public Object fileAdd(
			MultipartFile[] files,
			HttpSession session) throws Exception {
		// 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
		try {
			HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
			// 보드 멤버 넘버 셋

			String newFilename = null;
			if (files.length != 0) {
				for (int i = 0; i < files.length; i++) {
					HoneyBoardFile boardFile = new HoneyBoardFile();
					boardFile.setOriginFileName(files[i].getOriginalFilename());
					newFilename = FileUploadUtil.getNewFilename(files[i].getOriginalFilename());
					boardFile.setFileName(newFilename);
					boardFile.setMb_no(hMember.getMemberNo());
					boardFile.setFileSize(files[i].getSize());
					files[i].transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
					System.out.println("filesize: " + files[i].getSize());
					boardService.insertFile(boardFile);
				} 
			}
			return JsonResult.success();

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

	@RequestMapping(path="detail")
	public Object detail(int no) throws Exception {
		try {
			honey_boards board = boardService.getBoard(no);
			if (board == null) 
				throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");


			return JsonResult.success(board);

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}

	}

	@RequestMapping(path="updateForm")
	public Object updateForm(int no) throws Exception {
		System.out.println("detail 메서드 실");
		try {
			honey_boards board = boardService.getBoard(no);
			System.out.println("board 객체 받아옴");
			if (board == null) 
				throw new Exception("해당 번호의 게시물이 존재하지 않습니다.");
			return JsonResult.success(board);

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}

	}

	@RequestMapping(path="writeUpdate")
	public Object update(honey_boards board,
			MultipartFile[] files,
			HttpSession session) throws Exception {
		try {
			HashMap<String,Object> paramMap = new HashMap<>();
			paramMap.put("no", board.getNo());
			
			int memberNo = ((HoneyMembers)session.getAttribute("member")).getMemberNo();
			
//			boardService.updateBoard(board);
//			return JsonResult.success();
			if (!board.getYoutubeURL().equals("")) {
				String[] youtubeContents = board.getYoutubeURL().split("/");
				System.out.println("arr[3]= " + youtubeContents[3]);
				if (board.getYoutubeURL().contains("list")) {
					String[] youtubeList = youtubeContents[3].split("\\?");
					System.out.println("youtubeList: " + youtubeList[0]);
					board.setYoutubeURL(youtubeList[0]);
				} else {
					board.setYoutubeURL(youtubeContents[3]);
				}
			} else {
				board.setYoutubeURL(null);
			}

			if (files.length != 0) {
				board.setFileStatus(1);
			} else {
				board.setFileStatus(0);
			}
			boardService.updateBoard(board);

			if (!board.getUrl().equals("")) {
				System.out.println("URL 있을경우 시작");
				UrlInfo url = Scrapper.UrlForDB(board.getUrl());
				System.out.println("멤버번호 셋 시작");
				url.setMb_No(memberNo);
				System.out.println("멤버번호 셋 종료");
				//url.setBd_No(bd_No);
				//url.setBd_No(boardService.getBoardMax().getNo());
				//System.out.println("no= " + boardService.getBoardMax().getNo());
				boardService.updateUrl(url);
			}

			String newFilename = null;
			if (files.length != 0) {
				for (int i = 0; i < files.length; i++) {
					HoneyBoardFile boardFile = new HoneyBoardFile();
					boardFile.setOriginFileName(files[i].getOriginalFilename());
					newFilename = FileUploadUtil.getNewFilename(files[i].getOriginalFilename());
					boardFile.setFileName(newFilename);
					boardFile.setMb_no(memberNo);
					boardFile.setFileSize(files[i].getSize());
					files[i].transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
					System.out.println("filesize: " + files[i].getSize());
					boardService.updateBoardFile(boardFile);
				} 
			}
			return JsonResult.success();

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}

	}

	@RequestMapping(path="write_delete")
	public Object delete(int no) throws Exception {
		try {
			HashMap<String,Object> paramMap = new HashMap<>();
			paramMap.put("no", no);

			if (boardService.getBoard(no) == null) {
				throw new Exception("해당 게시물이 없습니다.");
			}
			boardService.deleteBoard(no);
			return JsonResult.success();
		} catch (Exception e) {
			return JsonResult.fail(e.getMessage());
		}
	}
	/*
  @RequestMapping(path="preview")
  public Object preview(String url, HttpSession session, SessionStatus sessionStatus) throws Exception {
	  try {
		  if (url ==  null) {
			  sessionStatus.setComplete();
			  System.out.println("서버에 전송된 url: " + url);
			  return JsonResult.fail();
		  } else {
			  session.setAttribute("url", url);
		  }
		  return JsonResult.success();
	  } catch (Exception e) {
		  return JsonResult.error(e.getMessage());
	  }
  }
	 */
	@RequestMapping(path="previewlist")
	public Object previewlist(String urlinfo) throws Exception {
		try {
			if (urlinfo == null) {
				return JsonResult.fail();
			}
			UrlInfo url = Scrapper.parsePageHeaderInfo(urlinfo);
			return JsonResult.success(url);
		} catch (Exception e) {
			return JsonResult.error(e.getMessage());
		}
	}

	@RequestMapping(value = "/boardFileUpload", method = RequestMethod.POST)
	public Object fileAdd(MultipartHttpServletRequest req, 
			HttpServletResponse res, HttpSession session) throws IOException {

		String uploadDir = sc.getRealPath("/upload") + "/";
		Iterator<String> itr =  req.getFileNames();
		/* Iterator : 모든 컬랙션으로부터 정보를 얻을 수 있는 인터페이스
		 */
		MultipartFile mpf = req.getFile(itr.next());
		String originFileName = mpf.getOriginalFilename();

		String newFilename = null;
		try {
			if (mpf != null && ! mpf.isEmpty()) {
				newFilename = FileUploadUtil.getNewFilename(originFileName);
				mpf.transferTo(new File(uploadDir + newFilename));
				HoneyBoardFile boardFile = new HoneyBoardFile();
				boardFile.setFileName(newFilename);
				HoneyMembers honeymembers =(HoneyMembers)session.getAttribute("member");
				boardFile.setMb_no(honeymembers.getMemberNo());

				boardService.insertBoardFile(boardFile);
			}
			return JsonResult.success();

		} catch (Exception e) {
			return JsonResult.fail(e.getStackTrace());
		}
	}
	
	
	@RequestMapping(path="likeBoard")
	public Object likeBoard(honey_boards no, HttpSession session) throws Exception {
		try {
			HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
			if(loginUser.getEmail() == null) {
				throw new RuntimeException();
			}
			
			honey_boards likeBoard = new honey_boards();
			likeBoard.setNo(no.getNo());
			likeBoard.setUserNo(loginUser.getMemberNo());
			try {
				boardService.likeBoardInsert(likeBoard);
			}catch (Exception e) {
				e.printStackTrace();
				int i = 0;
				return JsonResult.fail(i);
			}
			return JsonResult.success();
		} catch (RuntimeException e) {
			e.printStackTrace();
			return JsonResult.fail();
		} 
	}
	
	
	@RequestMapping(path="likeDisconnect")
	public Object followDisconnect(honey_boards no, HttpSession session) throws Exception {
		try {
			HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
			no.setUserNo(loginUser.getMemberNo());
			boardService.likeDisconnector(no);
			return JsonResult.success();
		} catch (RuntimeException e) {
			return JsonResult.fail();
		} 

	}
	
	
	@RequestMapping(path="checkingLike")
	public Object checkingFollow(honey_boards no, HttpSession session) throws Exception {
		try {
			HoneyMembers loginUser = (HoneyMembers)session.getAttribute("member");
			if(loginUser.getEmail() == null) {
				throw new RuntimeException();
			}
			honey_boards boardLike = new honey_boards();
			boardLike.setUserNo(loginUser.getMemberNo());
			boardLike.setNo(no.getNo());
			try {
				List<honey_boards> checker = boardService.likeChecker(boardLike);
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
			return JsonResult.fail();
		} 
	}
	
}

