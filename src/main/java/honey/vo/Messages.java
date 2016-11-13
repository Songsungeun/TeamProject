package honey.vo;

import java.util.Date;
import java.text.SimpleDateFormat;

public class Messages {
	static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	protected int messageNo;
	protected String nickName;
	protected String message;
	protected int loginUserNo;
	protected int messageTargetUserNo;
	protected int status;
	protected Date insertDate;    
	protected String insertDate2; 


	public static SimpleDateFormat getFormat() {
		return format;
	}
	public static void setFormat(SimpleDateFormat format) {
		honey_boards.format = format;
	}

	public Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
		this.insertDate2 = format.format(insertDate);
	}
	public String getInsertDate2() {
		return insertDate2;
	}
	public void setInsertDate2(String str) {
		this.insertDate2 = str;
	}
	
	
	public int getMessageNo() {
		return messageNo;
	}
	public void setMessageNo(int messageNo) {
		this.messageNo = messageNo;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getLoginUserNo() {
		return loginUserNo;
	}
	public void setLoginUserNo(int loginUserNo) {
		this.loginUserNo = loginUserNo;
	}
	public int getMessageTargetUserNo() {
		return messageTargetUserNo;
	}
	public void setMessageTargetUserNo(int messageTargetUserNo) {
		this.messageTargetUserNo = messageTargetUserNo;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Messages [messageNo=" + messageNo + ", nickName=" + nickName + ", message=" + message + ", loginUserNo="
				+ loginUserNo + ", messageTargetUserNo=" + messageTargetUserNo + ", status=" + status + "]";
	}




}
