package honey.vo;

import java.io.Serializable;

public class HoneyBoardFile implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int fileNo;
	protected int boardNo;
	protected String fileName;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

}
