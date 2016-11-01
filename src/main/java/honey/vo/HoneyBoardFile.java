package honey.vo;

import java.io.Serializable;

public class HoneyBoardFile implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int fileNo;
	protected int boardNo;
	protected String fileName;
	protected int mb_no;
	protected String OriginFileName;
	
	public int getFileNo() {
		return fileNo;
	}
	public void setFileNo(int fileNo) {
		this.fileNo = fileNo;
	}
	public int getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getMb_no() {
		return mb_no;
	}
	public void setMb_no(int mb_no) {
		this.mb_no = mb_no;
	}
	public String getOriginFileName() {
		return OriginFileName;
	}
	public void setOriginFileName(String originFileName) {
		OriginFileName = originFileName;
	}
	
	
	
	

}
