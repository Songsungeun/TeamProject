package honey.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

import org.jsoup.nodes.Document;

public class honey_boards implements Serializable{
  private static final long serialVersionUID = 1L;

  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
  protected int no;
  protected int userNo;
  protected int categoryNo;
  protected String title;
  protected String url;
  protected String urlInfo;
  protected String contents;
  protected Date createdDate;     // 이제 java.sql.Date 타입으로 날짜 정보를 제대로 다뤄보자!
  protected String createdDate2;  //birth
  protected int like;
  protected int viewCount;
  protected String fileName;
  protected int fileStatus;
  protected String youtubeURL;
  
  public static SimpleDateFormat getFormat() {
    return format;
  }
  public static void setFormat(SimpleDateFormat format) {
    honey_boards.format = format;
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getUserNo() {
    return userNo;
  }
  public void setUserNo(int userNo) {
    this.userNo = userNo;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getUrl() {
    return url;
  }
  public void setUrl(String url) {
    this.url = url;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  public Date getCreatedDate() {
    return createdDate;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
    this.createdDate2 = format.format(createdDate);
  }
  public String getCreatedDate2() {
    return createdDate2;
  }
  public void setCreatedDate2(String str) {
    this.createdDate = Date.valueOf(str);
    this.createdDate2 = str;
  }
  public int getLike() {
    return like;
  }
  public void setLike(int like) {
    this.like = like;
  }
  public int getViewCount() {
    return viewCount;
  }
  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }
  public static long getSerialversionuid() {
    return serialVersionUID;
  }
  public int getCategoryNo() {
    return categoryNo;
  }
  public void setCategoryNo(int categoryNo) {
    this.categoryNo = categoryNo;
  }
public String getUrlInfo() {
	return urlInfo;
}
public void setUrlInfo(String urlInfo) {
	this.urlInfo = urlInfo;
}
public String getFileName() {
	return fileName;
}
public void setFileName(String fileName) {
	this.fileName = fileName;
}
public int getFileStatus() {
	return fileStatus;
}
public void setFileStatus(int fileStatus) {
	this.fileStatus = fileStatus;
}

public String getYoutubeURL() {
	return youtubeURL;
}
public void setYoutubeURL(String youtubeURL) {
	this.youtubeURL = youtubeURL;
}
@Override
public String toString() {
	return "honey_boards [no=" + no + ", userNo=" + userNo + ", categoryNo=" + categoryNo + ", title=" + title
			+ ", url=" + url + ", urlInfo=" + urlInfo + ", contents=" + contents + ", createdDate=" + createdDate
			+ ", createdDate2=" + createdDate2 + ", like=" + like + ", viewCount=" + viewCount + ", fileName="
			+ fileName + "]";
}
  
	
}