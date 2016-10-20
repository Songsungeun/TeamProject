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
  protected String linkTitle;
  protected String email;
  protected String userNo;
  protected int parentComentNo;
  protected int chileComentNo;
  protected String parentComnet;
  protected String childComent;
  protected Date comentCreatedDate;
  protected String comentCreatedDate2;
  
  
  
  public int getParentComentNo() {
    return parentComentNo;
  }
  public void setParentComentNo(int parentComentNo) {
    this.parentComentNo = parentComentNo;
  }
  public int getChileComentNo() {
    return chileComentNo;
  }
  public void setChileComentNo(int chileComentNo) {
    this.chileComentNo = chileComentNo;
  }
  public String getParentComnet() {
    return parentComnet;
  }
  public void setParentComnet(String parentComnet) {
    this.parentComnet = parentComnet;
  }
  public String getChildComent() {
    return childComent;
  }
  public void setChildComent(String childComent) {
    this.childComent = childComent;
  }
  public Date getComentCreatedDate() {
    return comentCreatedDate;
  }
  public void setComentCreatedDate(Date comentCreatedDate) {
    this.comentCreatedDate = comentCreatedDate;
    this.comentCreatedDate2 = format.format(comentCreatedDate);
  }
  public String getComentCreatedDate2() {
    return comentCreatedDate2;
  }
  public void setComentCreatedDate2(String str) {
    this.comentCreatedDate = Date.valueOf(str);
    this.comentCreatedDate2 = str;
  }
  public String getUserNo() {
    return userNo;
  }
  public void setUserNo(String userNo) {
    this.userNo = userNo;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getLinkTitle() {
    return linkTitle;
  }
  public void setLinkTitle(String linkTitle) {
    this.linkTitle = linkTitle;
  }
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
