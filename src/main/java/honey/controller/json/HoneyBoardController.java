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
	honey_boards board = new honey_boards();

	@RequestMapping(path="writeadd")
	public Object add(
			honey_boards board,
			MultipartFile[] files,
			HttpSession session) throws Exception {
		// 성공하든 실패하든 클라이언트에게 데이터를 보내야 한다.
		System.out.println("board= " + board);
		System.out.println("요청 받음");
		try {
			System.out.println("add start");
			HoneyMembers hMember = (HoneyMembers)session.getAttribute("member");
			System.out.println(hMember.getMemberNo());
			// 보드 멤버 넘버 셋
			board.setUserNo(hMember.getMemberNo());
			System.out.println("title= " + board.getTitle());
			System.out.println("contents= " + board.getContents());
			System.out.println("youtubeurl= " + board.getYoutubeURL());

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
			boardService.insertBoard(board);

			if (!board.getUrl().equals("")) {
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

			String newFilename = null;
			if (files.length != 0) {
				for (int i = 0; i < files.length; i++) {
					HoneyBoardFile boardFile = new HoneyBoardFile();
					boardFile.setOriginFileName(files[i].getOriginalFilename());
					newFilename = FileUploadUtil.getNewFilename(files[i].getOriginalFilename());
					boardFile.setFileName(newFilename);
					boardFile.setMb_no(hMember.getMemberNo());
					files[i].transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
					boardService.insertBoardFile(boardFile);
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
}

