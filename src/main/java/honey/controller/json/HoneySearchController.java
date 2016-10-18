package honey.controller.json;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
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

import honey.dao.HoneySearcherDao;
import honey.vo.HoneySearchKeyword;
import honey.vo.JsonResult;

// 이 컨트롤러의 목적은 어느 페이지든지 검색을 하면 이 컨트롤러는 검색어 키워드를 쿠키에 저장하는 역할을 한다. 
@Controller
@RequestMapping({"/resultOfSearch/","/mainpage/", "/writepage/", "/adminpage/","/membership/"})
// 리퀘스트 맵핑을 여러개 할때 꼭 이런 방법밖에 없을까? 만약 100여개의 맵핑이 필요하다면 일일이 써줘야 할텐데 이건 너무 비효율적이고
// 유지 보수에도 좋지 못할거 같다. 어떤 방법이 있을텐데...
// 또한 이 객체 역시 디비에 직접적으로 접근할 필요가 없어 따로 서비스 클래스로 분리하지 않았다.
public class HoneySearchController {
	@Autowired HoneySearcherDao searcherDao;
	@RequestMapping("searchInfo")
	public Object searchInfo(HoneySearchKeyword searchInfo, HttpServletResponse response) throws UnsupportedEncodingException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		String searchValue = URLEncoder.encode(searchInfo.getSearchValue(),"UTF-8");
		// java에서 제공하는 url 인코더를 사용하여 문자열을 인코딩하여 쿠키에 저장한다.
		try {
			Cookie searchInfoCookie = new Cookie("searchInfo", searchValue);
			//쿠키의 생명주기?? 살아있는 시간?? 설정하는부분 
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
  public Object searchResult(@CookieValue(name="searchInfo")String searchInfo) throws Exception {
	  String searchfucker = URLDecoder.decode(searchInfo,"UTF-8");
	  System.out.println(searchfucker);
	  List searchBoardResult = searcherDao.selectFromBoard(searchfucker);
	  System.out.println(searchBoardResult);
	  List searchMemberResult = searcherDao.selectFromMembers(searchfucker);
	  System.out.println(searchMemberResult);
	  try {
		  if (searchMemberResult.isEmpty() == true) {
		  return JsonResult.success(searchBoardResult);
		  } else if (searchBoardResult.isEmpty() == true) {
		  return JsonResult.success(searchMemberResult);
		  } else {
			  return JsonResult.success(searchBoardResult, searchMemberResult);
		  }
	  } catch (Exception e) {
		  e.printStackTrace();
		  return JsonResult.fail(e.getMessage());
	  }
  }
  
}


