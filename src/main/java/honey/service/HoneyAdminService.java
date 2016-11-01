package honey.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import honey.vo.HoneyMain;
import honey.vo.HoneyMembers;

public interface HoneyAdminService {
   List<HoneyMain> adminBoardList(HttpSession session, int pageNo, int length) throws Exception ;
   void  adminBoardDelete(int no) throws Exception ;
}