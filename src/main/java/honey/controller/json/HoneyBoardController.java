package honey.controller.json;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;

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
import honey.vo.HoneyMembers;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

@Controller
@RequestMapping({"/mainpage/", "/writepage/"})
public class HoneyBoardController {
	@Autowired DefaultHoneyBoardService boardService;
	@Autowired ServletContext sc;

	@RequestMapping(path="writeadd")
	public Object add(
			honey_boards board, 
			//		  MultipartFile file1,
			//		  MultipartFile file2,
			HttpSession session) throws Exception {
		// 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
		System.out.println("요청 받음");
		String uploadDir = sc.getRealPath("/upload") + "/";
		try {
			System.out.println("add start");
			HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
			// 보드 멤버 넘버 셋
			board.setUserNo(hMember.getMemberNo());
			System.out.println("fileName= " + board.getFileName());
			boardService.insertBoard(board);
			System.out.println("board.getUrl: " + board.getUrl());

			if (board.getUrl() != "") {
				System.out.println("URL 있을경우 시작");
				UrlInfo url = Scrapper.UrlForDB(board.getUrl());
				System.out.println("멤버번호 셋 시작");
				url.setMb_No(hMember.getMemberNo());
				System.out.println("멤버번호 셋 종료");
				System.out.println("fileName= " + board.getFileName());
				//url.setBd_No(bd_No);
				//url.setBd_No(boardService.getBoardMax().getNo());
				//System.out.println("no= " + boardService.getBoardMax().getNo());
				boardService.insertUrl(url);
			}

			System.out.println("URL 없을 경");
			return JsonResult.success();

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}


	@RequestMapping(path="writeadd1")
	public Object add1(
			honey_boards board, 
			MultipartFile file,
			HttpSession session) throws Exception {
		// 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
		System.out.println("요청 받음");
		try {
			System.out.println("add start");
			HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
			// 보드 멤버 넘버 셋
			board.setUserNo(hMember.getMemberNo());
			boardService.insertBoard(board);
			System.out.println("board.getUrl: " + board.getUrl());

			if (board.getUrl() != "") {
				System.out.println("URL 있을경우 시작");
				UrlInfo url = Scrapper.UrlForDB(board.getUrl());
				System.out.println("멤버번호 셋 시작");
				url.setMb_No(hMember.getMemberNo());
				System.out.println("멤버번호 셋 종료");
				//url.setBd_No(bd_No);
				//url.setBd_No(boardService.getBoardMax().getNo());
				//System.out.println("no= " + boardService.getBoardMax().getNo());
				boardService.insertUrl(url);
			}
			
			String uploadDir = sc.getRealPath("/upload") + "/";
			/* Iterator : 모든 컬랙션으로부터 정보를 얻을 수 있는 인터페이스
			 */
			String originFileName = file.getOriginalFilename();
			HoneyBoardFile boardFile = new HoneyBoardFile();
			String newFilename = null;
			if (file != null && ! file.isEmpty()) {
				newFilename = FileUploadUtil.getNewFilename(originFileName);
				file.transferTo(new File(uploadDir + newFilename));
				
				boardFile.setFileName(newFilename);
				HoneyMembers honeymembers =(HoneyMembers)session.getAttribute("member");
				boardFile.setMb_no(honeymembers.getMemberNo());
			}
					boardService.insertBoardFile(boardFile);
			
			

			System.out.println("URL 없을 경우");
			return JsonResult.success();

		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}
	
	@RequestMapping(path="detail")
	public Object detail(int no) throws Exception {
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

	@RequestMapping(path="write_update")
	public Object update(honey_boards board) throws Exception {
		try {
			HashMap<String,Object> paramMap = new HashMap<>();
			paramMap.put("no", board.getNo());

			if (boardService.getBoard(board.getNo()) == null) {
				throw new Exception("해당 게시물이 없습니다.");
			}
			boardService.updateBoard(board);
			return JsonResult.success();

		} catch (Exception e) {
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
		System.out.println("fileUpload");
		System.out.println("req= " + req);
		try {
		String uploadDir = sc.getRealPath("/upload") + "/";
		Iterator<String> itr =  req.getFileNames();
		/* Iterator : 모든 컬랙션으로부터 정보를 얻을 수 있는 인터페이스
		 */
		MultipartFile mpf = req.getFile(itr.next());
		String originFileName = mpf.getOriginalFilename();
		HoneyBoardFile boardFile = new HoneyBoardFile();
		String newFilename = null;
		if (mpf != null && ! mpf.isEmpty()) {
			newFilename = FileUploadUtil.getNewFilename(originFileName);
			mpf.transferTo(new File(uploadDir + newFilename));
			
			boardFile.setFileName(newFilename);
			HoneyMembers honeymembers =(HoneyMembers)session.getAttribute("member");
			boardFile.setMb_no(honeymembers.getMemberNo());
		}
		HashMap<String, Object> map = new HashMap<>();
		map.put("filename", newFilename);
		map.put("originalFileName", originFileName);
				//boardService.insertBoardFile(boardFile);
				return map;
			} catch (Exception e) {
				e.printStackTrace();
				return JsonResult.fail(e.getMessage());
			}
		}

	}


