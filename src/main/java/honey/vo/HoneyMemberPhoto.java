package honey.vo;

public class HoneyMemberPhoto {
  
 protected int memberNo;
 protected String email;
 protected String photoName;
 
 public String getEmail() {
  return email;
}

public void setEmail(String email) {
  this.email = email;
}
  
  public int getMemberNo() {
    return memberNo;
  }
  
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  
  public String getPhotoName() {
    return photoName;
  }
  
  public void setPhotoName(String photoName) {
    this.photoName = photoName;
  }

}
