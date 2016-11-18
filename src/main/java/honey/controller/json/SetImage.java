package honey.controller.json;

import java.util.List;

import honey.vo.HoneyMain;
import honey.vo.HoneySearchKeyword;
import honey.vo.UrlInfo;

public class SetImage {
	
	public static List<HoneyMain> setImage(List<HoneyMain> honeyMainList, List<UrlInfo> urlInfoList) {

		for (int i = 0; i < honeyMainList.size(); i++) {

			for (int j = 0; j < urlInfoList.size(); j++) {
				if (honeyMainList.get(i).getNo() == urlInfoList.get(j).getBd_No()) {
					honeyMainList.get(i).setLinkTitle(urlInfoList.get(j).getTitle());
					honeyMainList.get(i).setLinkDesc(urlInfoList.get(j).getDescription());
					honeyMainList.get(i).setLinkImage(urlInfoList.get(j).getImage());
					honeyMainList.get(i).setLinkURL(urlInfoList.get(j).getUrlAddr());
					honeyMainList.get(i).setLinkDetailUrl(urlInfoList.get(j).getDetailUrl());
				}
			}
			//String[] imageHref = honeyMainList.get(i).getLinkDesc().split("\"");
			if (honeyMainList.get(i).getLinkImage() == null) {
				if (honeyMainList.get(i).getContents() != null) {
					boolean image = honeyMainList.get(i).getContents().contains("img src");
					if (image) {
						String[] temp = honeyMainList.get(i).getContents().split("src=");
						String[] temp1 = temp[1].split(" ");
						String[] temp2 = temp1[0].split("\"");
						honeyMainList.get(i).setLinkImage(temp2[1]);
					} else if (honeyMainList.get(i).getYoutubeURL() != null){
						honeyMainList.get(i).setLinkImage("https://img.youtube.com/vi/" + honeyMainList.get(i).getYoutubeURL() + "/mqdefault.jpg");
					} else {
						honeyMainList.get(i).setLinkImage("/TeamProject/upload/MainDefault.jpg");
					}
				} else if (honeyMainList.get(i).getYoutubeURL() != null){
					honeyMainList.get(i).setLinkImage("https://img.youtube.com/vi/" + honeyMainList.get(i).getYoutubeURL() + "/mqdefault.jpg");
				} else {
					honeyMainList.get(i).setLinkImage("/TeamProject/upload/MainDefault.jpg");
				}
			}
		}
		return honeyMainList;
	}
	
	
	 public static List<HoneySearchKeyword> setImage2(List<HoneySearchKeyword> honeyMainList, List<UrlInfo> urlInfoList) {

	    for (int i = 0; i < honeyMainList.size(); i++) {

	      for (int j = 0; j < urlInfoList.size(); j++) {
	        if (honeyMainList.get(i).getNo() == urlInfoList.get(j).getBd_No()) {
	          honeyMainList.get(i).setLinkTitle(urlInfoList.get(j).getTitle());
	          honeyMainList.get(i).setLinkDesc(urlInfoList.get(j).getDescription());
	          honeyMainList.get(i).setLinkImage(urlInfoList.get(j).getImage());
	          honeyMainList.get(i).setLinkURL(urlInfoList.get(j).getUrlAddr());
	          honeyMainList.get(i).setLinkDetailUrl(urlInfoList.get(j).getDetailUrl());
	        }
	      }
	      //String[] imageHref = honeyMainList.get(i).getLinkDesc().split("\"");
	      if (honeyMainList.get(i).getLinkImage() == null) {
	        if (honeyMainList.get(i).getContents() != null) {
	          boolean image = honeyMainList.get(i).getContents().contains("img src");
	          if (image) {
	            String[] temp = honeyMainList.get(i).getContents().split("src=");
	            String[] temp1 = temp[1].split(" ");
	            String[] temp2 = temp1[0].split("\"");
	            honeyMainList.get(i).setLinkImage(temp2[1]);
	          } else if (honeyMainList.get(i).getYouTubeURL() != null){
	            honeyMainList.get(i).setLinkImage("https://img.youtube.com/vi/" + honeyMainList.get(i).getYouTubeURL() + "/mqdefault.jpg");
	          } else {
	            honeyMainList.get(i).setLinkImage("/TeamProject/upload/MainDefault.jpg");
	          }
	        } else if (honeyMainList.get(i).getYouTubeURL() != null){
	          honeyMainList.get(i).setLinkImage("https://img.youtube.com/vi/" + honeyMainList.get(i).getYouTubeURL() + "/mqdefault.jpg");
	        } else {
	          honeyMainList.get(i).setLinkImage("/TeamProject/upload/MainDefault.jpg");
	        }
	      }
	    }
	    return honeyMainList;
	  }
	
}
