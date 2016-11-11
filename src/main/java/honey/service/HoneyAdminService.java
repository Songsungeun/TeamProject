package honey.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import honey.vo.HoneyMain;
import honey.vo.honey_boards;

public interface HoneyAdminService {
   List<HoneyMain> adminBoardList(int memberNo, int value1, int value2) throws Exception ;
   List<HoneyMain> adminLikeExtract(int memberNo) throws Exception ;
   void  adminBoardDelete(int value) throws Exception ;
   int myWriteTotalPage(int memberNo) throws Exception;
   int likeTotalPage(int memberNo) throws Exception;
}