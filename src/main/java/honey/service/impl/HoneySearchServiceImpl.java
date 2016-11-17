package honey.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import honey.controller.json.SetImage;
import honey.dao.HoneyPhotoDao;
import honey.dao.HoneySearcherDao;
import honey.service.HoneyMainService;
import honey.service.HoneySearchService;
import honey.service.HoneymembersService;
import honey.vo.HoneyMemberPhoto;
import honey.vo.HoneySearchKeyword;
import honey.vo.UrlInfo;

@Service
public class HoneySearchServiceImpl implements HoneySearchService {
  @Autowired HoneyMainService mainService;
  @Autowired HoneySearcherDao searcherDao;
  @Autowired HoneyPhotoDao photoDao;
  @Autowired HoneymembersService honeymembersService;

  @Override
  public List<HoneySearchKeyword> searchServiceBoardResult(String searchValue, int boardLength)
      throws Exception {
    Map<String, Object> bMap = new HashMap<>();
    bMap.put("searchValue", searchValue);
    bMap.put("boardLength", boardLength);
    List<HoneySearchKeyword> searchBoardResult = searcherDao.selectFromBoard(bMap);
    List<UrlInfo> urlList = mainService.getURLList();
    List<HoneySearchKeyword> resultList = SetImage.setImage2(searchBoardResult, urlList);

    for (int i = 0; i < resultList.size(); i++) {
      String userPhoto = mainService.getPhoto(Integer.parseInt(resultList.get(i).getUserNo()));
      searchBoardResult.get(i).setUserProfilePath(userPhoto);
    }
    return searchBoardResult;

  }

  @Override
  public List<HoneySearchKeyword> searchServiceMemberResult(String searchValue, int memberLength)
      throws Exception {
    Map<String, Object> mMap = new HashMap<>();
    mMap.put("searchValue", searchValue);
    mMap.put("memberLength", memberLength);

    List<HoneySearchKeyword> searchMemberResult = searcherDao.selectFromMembers(mMap);

    String[] temp2 = new String[searchMemberResult.size()];
    List<HoneyMemberPhoto> memberEmailExtract = new ArrayList<>();
    for (int i = 0; i < temp2.length; i++) {
      temp2[i] = searchMemberResult.get(i).getEmail();
      memberEmailExtract.add(photoDao.extractMemberNum(temp2[i]));
      searchMemberResult.get(i).setUserProfilePath(honeymembersService.getProfileFileName(memberEmailExtract.get(i).getMemberNo()));
    }
    return searchMemberResult;
  }

  @Override
  public List<HoneySearchKeyword> searchServiceFileResult(String searchValue, int fileLength) throws Exception {
    Map<String,Object> fMap = new HashMap<>();
    fMap.put("searchValue", searchValue);
    fMap.put("fileLength", fileLength);
    List<HoneySearchKeyword> searctFromFiles = searcherDao.selectFromFiles(fMap);
    
    return searctFromFiles;
  }
  
  @Override
  public List<HoneySearchKeyword> memberResultTotalPage(String searchValue) throws Exception {
    List<HoneySearchKeyword> searchMemberResultLengthList = searcherDao.memberResultLengthList(searchValue);
    return searchMemberResultLengthList;
  }

  @Override
  public List<HoneySearchKeyword> boardResultTotalPage(String searchValue) throws Exception {
    List<HoneySearchKeyword> searchBoardResultLengthList = searcherDao.boardResultLengthList(searchValue);
    return searchBoardResultLengthList;
  }

  @Override
  public List<HoneySearchKeyword> FileResultTotalPage(String searchValue) throws Exception {
    List<HoneySearchKeyword> searchFileResultLengthList = searcherDao.FileResultLengthList(searchValue);
    return searchFileResultLengthList;
  }

@Override
public List<HoneySearchKeyword> autoSearchValue() throws Exception {
	 List<HoneySearchKeyword> boardTitle = searcherDao.getBoardTitle();
	return boardTitle;
}


}
