package honey.controller.json;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import honey.dao.HoneyPhotoDao;
import honey.dao.HoneySearcherDao;
import honey.service.HoneyMainService;
import honey.service.HoneySearchService;
import honey.service.HoneymembersService;
import honey.vo.HoneyMain;
import honey.vo.HoneyMemberPhoto;
import honey.vo.HoneySearchKeyword;
import honey.vo.JsonResult;
import honey.vo.UrlInfo;

// 이 컨트롤러의 목적은 어느 페이지든지 검색을 하면 이 컨트롤러는 검색어 키워드를 쿠키에 저장하는 역할을 한다. 
@Controller
@RequestMapping({ "/resultOfSearch/", "/mainpage/", "/writepage/", "/adminpage/", "/membership/" })
// 리퀘스트 맵핑을 여러개 할때 꼭 이런 방법밖에 없을까? 만약 100여개의 맵핑이 필요하다면 일일이 써줘야 할텐데 이건 너무 비효율적이고
// 유지 보수에도 좋지 못할거 같다. 어떤 방법이 있을텐데...
// 또한 이 객체 역시 디비에 직접적으로 접근할 필요가 없어 따로 서비스 클래스로 분리하지 않았다.
public class HoneySearchController {
	@Autowired HoneySearchService searchService;
	@Autowired HoneySearcherDao searcherDao;
	
	@RequestMapping("searchInfo")
	public Object searchInfo(HoneySearchKeyword searchInfo, HttpServletResponse response)
			throws UnsupportedEncodingException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		String searchValue = URLEncoder.encode(searchInfo.getSearchValue(), "UTF-8");
		// java에서 제공하는 url 인코더를 사용하여 문자열을 인코딩하여 쿠키에 저장한다.
		
		try {
			Cookie searchInfoCookie = new Cookie("searchInfo", searchValue);
			// 쿠키의 생명주기?? 살아있는 시간?? 설정하는부분
			if (searchValue == null) {
				searchInfoCookie.setMaxAge(0);
			} else {
				searchInfoCookie.setMaxAge(60 * 60 * 24 * 7);
				// 모든 경로에서 접근 가능
				searchInfoCookie.setPath("/");
			}
			response.addCookie(searchInfoCookie);
			return JsonResult.success(searchInfoCookie);
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}
	}

	@RequestMapping("searcher")
	public Object searchResult(
	    @CookieValue(name = "searchInfo") String searchInfo,
	    @RequestParam(defaultValue = "4") int memberLength, 
	    @RequestParam(defaultValue = "6") int boardLength,
	    @RequestParam(defaultValue = "20") int fileLength) throws Exception {
		String searchfucker = URLDecoder.decode(searchInfo, "UTF-8"); 		// url 인코딩하여 쿠키에 저장한 값을 디코딩 하여 꺼낸 후 변수에 값을 저장했다.

		List<HoneySearchKeyword> searchBoardResult = searchService.searchServiceBoardResult(searchfucker, boardLength);
		List<HoneySearchKeyword> searchMemberResult = searchService.searchServiceMemberResult(searchfucker, memberLength);
	  List<HoneySearchKeyword> searchFileResult = searchService.searchServiceFileResult(searchfucker, fileLength);
    // 우선 게시물과 회원 정보 둘 모두 뒤져서 일치하는 값이 있는지 확인 한다.

		List<HoneySearchKeyword> searchBoardResultListLength = searchService.boardResultTotalPage(searchfucker);
		List<HoneySearchKeyword> searchMemberResultListLength = searchService.memberResultTotalPage(searchfucker);
		List<HoneySearchKeyword> searchFileResultListLength = searchService.FileResultTotalPage(searchfucker);
    // 페이징 작업을 위해 만든 전체검색결과 size()용 메소드		
		
		try {
		 HashMap<String, Object> searchData = new HashMap<>();
		  searchData.put("searchMemberResult", searchMemberResult);
			searchData.put("memberLength", memberLength);
			searchData.put("memberSearchLength", searchMemberResultListLength.size());
			
			searchData.put("searchBoardResult", searchBoardResult);
			searchData.put("boardLength", boardLength);
      searchData.put("boardSearchLength", searchBoardResultListLength.size());
      
      searchData.put("searchFileResult",searchFileResult);
      searchData.put("fileLength", fileLength);
      searchData.put("searchFileResultListLength", searchFileResultListLength.size());
      
			searchData.put("searchValue", searchfucker); //검색어 
			
			return JsonResult.success(searchData);
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.fail(e.getMessage());
		}
	}

}
