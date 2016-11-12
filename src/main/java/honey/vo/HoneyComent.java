package honey.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class HoneyComent implements Serializable{
  private static final long serialVersionUID = 1L;
  
  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
  protected int cmtNo;
  protected int comentThread;
  protected int comentDepth;
  protected String coment;
  protected String writerNick;
  protected String contents;
  protected Date createdDate;     // 이제 java.sql.Date 타입으로 날짜 정보를 제대로 다뤄보자!
  protected String createdDate2;  //birth
  protected int no;
  protected int memberNo;
  protected int not_use_no;
  protected String commentMemberPhoto;
  
  
  
  public String getCommentMemberPhoto() {
    return commentMemberPhoto;
  }
  public void setCommentMemberPhoto(String commentMemberPhoto) {
    this.commentMemberPhoto = commentMemberPhoto;
  }
  public int getNot_use_no() {
    return not_use_no;
  }
  public void setNot_use_no(int not_use_no) {
    this.not_use_no = not_use_no;
  }
  
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public void setCreatedDate(Date createdDate) {
    this.createdDate = createdDate;
    this.createdDate2 = format.format(createdDate);
  }
  public String getCreatedDate2() {
    return createdDate2;
  }
  public int getCmtNo() {
    return cmtNo;
  }
  public void setCmtNo(int cmtNo) {
    this.cmtNo = cmtNo;
  }
  public int getComentThread() {
    return comentThread;
  }
  public void setComentThread(int comentThread) {
    this.comentThread = comentThread;
  }
  public int getComentDepth() {
    return comentDepth;
  }
  public void setComentDepth(int comentDepth) {
    this.comentDepth = comentDepth;
  }
  public String getComent() {
    return coment;
  }
  public void setComent(String coment) {
    this.coment = coment;
  }
  public String getWriterNick() {
    return writerNick;
  }
  public void setWriterNick(String writerNick) {
    this.writerNick = writerNick;
  }
  public String getContents() {
    return contents;
  }
  public void setContents(String contents) {
    this.contents = contents;
  }
  
}
