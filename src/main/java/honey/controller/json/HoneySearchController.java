package honey.controller.json;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import honey.vo.HoneySearchKeyword;

// 이 컨트롤러의 목적은 어느 페이지든지 검색을 하면 이 컨트롤러는 검색어 키워드를 쿠키에 저장하는 역할을 한다. 
@Controller
@RequestMapping({"/resultOfSearch/","/mainpage/", "/writepage/", "/adminpage/","/membership/"})
// 리퀘스트 맵핑을 여러개 할때 꼭 이런 방법밖에 없을까? 만약 100여개의 맵핑이 필요하다면 일일이 써줘야 할텐데 이건 너무 비효율적이고
// 유지 보수에도 좋지 못할거 같다. 어떤 방법이 있을텐데...
public class HoneySearchController {

	@RequestMapping("searchInfo")
	public void searchInfo(HoneySearchKeyword searchInfo, HttpServletResponse response) throws UnsupportedEncodingException, InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
		String searchValue = searchInfo.getSearchValue();
		System.out.println(searchValue);
		AES256Util encoder = new AES256Util();
		String value = encoder.aesEncode(searchValue);
		String decodingValue = encoder.aesDecode(value);
		System.out.println(value);
		System.out.println(decodingValue);
		/*
		try {
			Cookie searchInfoCookie = new Cookie("searchInfo", searchHashCodeEncodingValue);
			//쿠키의 생명주기?? 살아있는 시간?? 설정하는부분 
			if (searchHashCodeEncodingValue == null) {
				searchInfoCookie.setMaxAge(0);
			} else {
				searchInfoCookie.setMaxAge(60 * 60 * 24 * 7);
				// 모든 경로에서 접근 가능 
				searchInfoCookie.setPath("/");
			}
			response.addCookie(searchInfoCookie);
			System.out.println(searchInfoCookie.getValue());
			return JsonResult.success(searchInfoCookie);
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}		
		*/
	}

}


