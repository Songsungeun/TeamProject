package honey.service;

import java.util.List;

import honey.vo.FileList;
import honey.vo.HoneyMain;
import honey.vo.UrlInfo;



public interface HoneyMainService {
  List<HoneyMain> getMainList(int pageNo, int length) throws Exception;
  
  List<HoneyMain> getPopList(int pageNo, int length) throws Exception;
  
  List<HoneyMain> getselectListandCategory(int categoryNo, int pageNo, int length) throws Exception;
  
  List<FileList> getFileList(int no) throws Exception;
  
  HoneyMain getPost(int no) throws Exception;
  
  void getIncreaseViewCount(int no) throws Exception;
  
  void increase_Like(int no) throws Exception;
  
  void decrease_Like(int no) throws Exception;
  
  UrlInfo getUrl(int no) throws Exception;
  
  List<UrlInfo> getURLList() throws Exception;
  
  String getPhoto(int memberNo) throws Exception;
}
