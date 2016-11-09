package honey.controller.json;

import java.util.List;

import honey.vo.HoneyBoardFile;

public class Thumbnail {
	public List<HoneyBoardFile> setThumbnail(List<HoneyBoardFile> fileList) {
		String extension;
		String[] extensionArr;
		for (int i = 0; i < fileList.size(); i++) {
			extension = fileList.get(i).getOriginFileName();
			extensionArr = extension.split("\\.");

			if(extensionArr[extensionArr.length-1].equals("txt")) {
				fileList.get(i).setFileThumbnail("txt.png");
			} else if (extensionArr[extensionArr.length-1].equals("avi")) {
				fileList.get(i).setFileThumbnail("avi.png");
			} else if (extensionArr[extensionArr.length-1].equals("doc") || extensionArr[extensionArr.length-1].equals("docx")) {
				fileList.get(i).setFileThumbnail("doc.png");
			} else if (extensionArr[extensionArr.length-1].equals("mp4")) {
				fileList.get(i).setFileThumbnail("mp4.png");
			} else if (extensionArr[extensionArr.length-1].equals("mpeg")) {
				fileList.get(i).setFileThumbnail("mpeg.png");
			} else if (extensionArr[extensionArr.length-1].equals("pdf")) {
				fileList.get(i).setFileThumbnail("pdf.png");
			} else if (extensionArr[extensionArr.length-1].equals("ppt") || extensionArr[extensionArr.length-1].equals("pptx")) {
				fileList.get(i).setFileThumbnail("ppt.png");
			} else if (extensionArr[extensionArr.length-1].equals("wmv")) {
				fileList.get(i).setFileThumbnail("wmv.png");
			} else if (extensionArr[extensionArr.length-1].equals("xls") || extensionArr[extensionArr.length-1].equals("xlsx")) {
				fileList.get(i).setFileThumbnail("xls.png");
			} else if (extensionArr[extensionArr.length-1].equals("zip") || extensionArr[extensionArr.length-1].equals("7z") || 
					extensionArr[extensionArr.length-1].equals("egg") || extensionArr[extensionArr.length-1].equals("rar") || 
					extensionArr[extensionArr.length-1].equals("alz") || extensionArr[extensionArr.length-1].equals("tar") ||
					extensionArr[extensionArr.length-1].equals("gz")) {
				fileList.get(i).setFileThumbnail("zip.png");
			} else if (extensionArr[extensionArr.length-1].equals("jpg") || extensionArr[extensionArr.length-1].equals("jpeg") || extensionArr[extensionArr.length-1].equals("png") || extensionArr[extensionArr.length-1].equals("svg") || extensionArr[extensionArr.length-1].equals("bmp") 
					|| extensionArr[extensionArr.length-1].equals("gif")) {
				fileList.get(i).setFileThumbnail(fileList.get(i).getFileName());
			} else {
				fileList.get(i).setFileThumbnail("java.png");
			}
		}
		return fileList;
	}
}
