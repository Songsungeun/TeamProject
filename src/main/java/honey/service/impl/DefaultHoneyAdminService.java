package honey.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.dao.tempDao;
import honey.service.HoneyAdminService;
import honey.vo.HoneyMain;
import honey.vo.honey_boards;

@Service
public class DefaultHoneyAdminService implements HoneyAdminService {
  HttpSession session;
  
  @Autowired tempDao tempdao;
  public List<HoneyMain> adminBoardList(int memberNo,int pageNo, int length) throws Exception {
    HashMap<String, Object> map = new HashMap<>();
      map.put("startIndex", (pageNo - 1) * length);
      map.put("length", length);
      map.put("userNo",memberNo);
      return  tempdao.selectList1(map);
  }
  
  public List<HoneyMain> adminLikeExtract(int memberNo) throws Exception {
    List<honey_boards> extractOfLikeBoardsByUserNo = tempdao.likePostsUserNum(memberNo);
    List<HoneyMain> temp = new ArrayList<>();
      for (int i = 0; i < extractOfLikeBoardsByUserNo.size() ; i++) {
        temp.addAll(tempdao.likePosts(extractOfLikeBoardsByUserNo.get(i).getNo()));
      }
     return   temp;
  }
  
  public void  adminBoardDelete(int no) throws Exception {
     tempdao.delete(no);
  }

  @Override
  public int myWriteTotalPage(int memberNo) throws Exception {
    int count = tempdao.adminMyWriteCountAll(memberNo);
    return count+=1;
  }

  @Override
  public int likeTotalPage(int memberNo) throws Exception {
    int count = tempdao.adminLikePostsCountAll(memberNo);
    return count;
  }
}
