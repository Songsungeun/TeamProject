package honey.dao;

import java.util.List;
import java.util.Map;

import honey.vo.HoneyMain;
import honey.vo.UrlInfo;
import honey.vo.honey_boards;

public interface tempDao {
  List<HoneyMain> selectList(Map<String, Object> paramMap) throws Exception;
  List<HoneyMain> selectList1(Map<String, Object> paramMap) throws Exception;
  List<honey_boards>  likePostsUserNum(int memberNo) throws Exception; // 좋아요 게시물 번호 리턴 메소드
  List<HoneyMain> likePosts(int no) throws Exception; // 좋아요 게시물 리턴 메소드
  int adminMyWriteCountAll(int no) throws Exception;
  int adminLikePostsCountAll(int no) throws Exception; 
  
  int insert(honey_boards board) throws Exception;
  honey_boards selectOne(int no) throws Exception;
  int update(honey_boards board) throws Exception;
  int delete(int no) throws Exception;
  int insertUrl(UrlInfo urlInfo) throws Exception;
  int insertLikeBoard(honey_boards likeBoard);
  List<honey_boards> selectLikeCountByBoardNo(int likeBoard);
  int updateLikeNo(honey_boards likeBoard);
  int deleteLike(honey_boards no);
  List<honey_boards> selectLikeBoard(honey_boards boardLike);
  int updateUrl(UrlInfo urlInfo) throws Exception;
}