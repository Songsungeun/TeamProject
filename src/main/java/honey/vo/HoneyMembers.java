package honey.vo;

public class HoneyMembers {
	protected int memberNo;
	protected int followMemberNo;
	protected String userName;
	protected String email;
	protected String nickname;
	protected String password;
	protected String phone;
	protected String userBirthDay;
	protected String profileFileName;
	protected String introduce;
	protected String profileFilePath;
	
	public int getMemberNo() {
		return memberNo;
	}
	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}
	public int getFollowMemberNo() {
		return followMemberNo;
	}
	public void setFollowMemberNo(int followMemberNo) {
		this.followMemberNo = followMemberNo;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getUserBirthDay() {
		return userBirthDay;
	}
	public void setUserBirthDay(String userBirthDay) {
		this.userBirthDay = userBirthDay;
	}
	public String getProfileFileName() {
		return profileFileName;
	}
	public void setProfileFileName(String profileFileName) {
		this.profileFileName = profileFileName;
	}

	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public String getProfileFilePath() {
		return profileFilePath;
	}
	public void setProfileFilePath(String profileFilePath) {
		this.profileFilePath = profileFilePath;
	}
	@Override
	public String toString() {
		return "HoneyMembers [memberNo=" + memberNo + ", followMemberNo=" + followMemberNo + ", userName=" + userName
				+ ", email=" + email + ", nickname=" + nickname + ", password=" + password + ", phone=" + phone
				+ ", userBirthDay=" + userBirthDay + ", profileFileName=" + profileFileName + ", introduce=" + introduce
				+ ", profileFilePath=" + profileFilePath + "]";
	}
	
	
	
}
