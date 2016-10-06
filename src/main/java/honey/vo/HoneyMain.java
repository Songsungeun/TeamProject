package honey.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class HoneyMain implements Serializable{
  private static final long serialVersionUID = 1L;

  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
  protected int no;
  protected String title;
  protected String url;
  protected String writerNick;
  protected String contents;
  protected Date createdDate;     // 이제 java.sql.Date 타입으로 날짜 정보를 제대로 다뤄보자!
  protected String createdDate2;  //birth
  protected int like;
  protected int viewCount;
  
  
  public String getWriterNick() {
    return writerNick;
  }
  public void setWriterNick(String writerNick) {
    this.writerNick = writerNick;
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
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
  
}
