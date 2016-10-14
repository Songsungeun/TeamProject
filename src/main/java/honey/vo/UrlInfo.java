package honey.vo;

import java.io.Serializable;

public class UrlInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String title;
	private String image;
	private String description;
	private String urlAddr;
	private String detailUrl;
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getUrlAddr() {
		return urlAddr;
	}
	public void setUrlAddr(String urlAddr) {
		this.urlAddr = urlAddr;
	}
	public String getDetailUrl() {
		return detailUrl;
	}
	public void setDetailUrl(String detailUrl) {
		this.detailUrl = detailUrl;
	}
	
	
	
}
