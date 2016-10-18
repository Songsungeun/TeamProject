package honey.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import honey.vo.honey_boards;

public interface HoneyAdminService {
   List<honey_boards> adminBoardList(HttpSession session,int pageNo, int length) throws Exception ;
   void  adminBoardDelete(int no) throws Exception ;
}