package honey.service;

import java.util.List;

import honey.vo.HoneyMain;
import honey.vo.HoneySearchKeyword;

public interface HoneyAdminService {
   List<HoneyMain> adminBoardList(int memberNo, int value1, int value2) throws Exception ;
   List<HoneyMain> adminLikeExtract(int memberNo) throws Exception ;
   void  adminBoardDelete(int value) throws Exception ;
   int myWriteTotalPage(int memberNo) throws Exception;
   int likeTotalPage(int memberNo) throws Exception;
   List<HoneySearchKeyword> adminPostSearch(int boardLength, String SearchValue, int memberNo ) throws Exception;
}