package honey.controller.json;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import honey.vo.JsonResult;

// 이 컨트롤러의 목적은 어느 페이지든지 검색을 하면 이 컨트롤러는 검색어 키워드를 쿠키에 저장하는 역할을 한다. 
@Controller
@RequestMapping({"/resultOfSearch/","/mainpage/", "/writepage/", "/adminpage/","/membership/"})
public class HoneySearchController {
	@RequestMapping("/searchInfo/")
	public Object searchInfo(String searchValue, HttpServletResponse response) {
		try {
			Cookie searchInfoCookie = new Cookie("searchInfo", searchValue);
			//쿠키의 생명주기?? 살아있는 시간?? 설정하는부분 
			if (searchValue == null) {
				searchInfoCookie.setMaxAge(0);
			} else {
				searchInfoCookie.setMaxAge(60 * 60 * 24 * 7);
			}
			response.addCookie(searchInfoCookie);
			System.out.println(searchInfoCookie);
			return JsonResult.success(searchInfoCookie);
		} catch (Exception e) {
			e.printStackTrace();
			return JsonResult.error(e.getMessage());
		}

	}
}
