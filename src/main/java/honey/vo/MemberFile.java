package honey.vo;

import java.io.Serializable;

public class MemberFile implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected int no;
  protected int memberNo;
  protected String filename;
  
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public String getFilename() {
    return filename;
  }
  public void setFilename(String filename) {
    this.filename = filename;
  }
public int getMemberNo() {
	return memberNo;
}
public void setMemberNo(int memberNo) {
	this.memberNo = memberNo;
}
@Override
public String toString() {
	return "MemberFile [no=" + no + ", memberNo=" + memberNo + ", filename=" + filename + "]";
}
  
  
}