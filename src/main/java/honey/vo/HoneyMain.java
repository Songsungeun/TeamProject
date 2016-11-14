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
	protected String email;
	protected String userNo;
	protected int categoryNo;
	protected String category;
	protected String linkTitle;
	protected String linkURL;
	protected String linkDetailUrl;
	protected String linkImage;
	protected String linkDesc;
	protected String userProfilePath;
	protected int fileStatus;
	protected String youtubeURL;
//	protected String splituserProfilePath;
//	
//	
//	public String getSplituserProfilePath() {
//	  return splituserProfilePath;
//	}
//	public void setSplituserProfilePath(String userProfilePath) {
//	  String[] splitPath = userProfilePath.split(".");
//	  if(splitPath.length == 2) {
//	    this.splituserProfilePath = "/TeamProject/upload/" + userProfilePath;
//	  } else {
//	    this.splituserProfilePath = "http://graph.facebook.com/" + userProfilePath + "/pictuer";
//	  }
//	}
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getCategoryNo() {
		return categoryNo;
	}
	public void setCategoryNo(int categoryNo) {
		this.categoryNo = categoryNo;
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
	public static SimpleDateFormat getFormat() {
		return format;
	}
	public static void setFormat(SimpleDateFormat format) {
		HoneyMain.format = format;
	}
	public String getLinkTitle() {
		return linkTitle;
	}
	public void setLinkTitle(String linkTitle) {
		this.linkTitle = linkTitle;
	}
	public String getLinkURL() {
		return linkURL;
	}
	public void setLinkURL(String linkURL) {
		this.linkURL = linkURL;
	}
	public String getLinkDetailUrl() {
		return linkDetailUrl;
	}
	public void setLinkDetailUrl(String linkDetailUrl) {
		this.linkDetailUrl = linkDetailUrl;
	}
	public String getLinkImage() {
		return linkImage;
	}
	public void setLinkImage(String linkImage) {
		this.linkImage = linkImage;
	}
	public String getLinkDesc() {
		return linkDesc;
	}
	public void setLinkDesc(String linkDesc) {
		this.linkDesc = linkDesc;
	}
	public String getUserProfilePath() {
		return userProfilePath;
	}
	public void setUserProfilePath(String userProfilePath) {
		this.userProfilePath = userProfilePath;
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



}
