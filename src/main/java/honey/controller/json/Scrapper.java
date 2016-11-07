package honey.controller.json;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import honey.vo.UrlInfo;


public class Scrapper {
		
	public static UrlInfo parsePageHeaderInfo(String urlStr) throws Exception {
		System.out.println("HTML parsing Start");
		Connection con = Jsoup.connect(urlStr);
		Document doc = con.get();
		System.out.println("url 정보 얻어옴");
		UrlInfo urlInfo = new UrlInfo();
		
		String title = null;
		System.out.println("Title Parsing Start");
		Elements metaOgTitle = doc.select("meta[property=og:title]");
		if (metaOgTitle != null) {
			title = metaOgTitle.attr("content");
		}
		System.out.println("Title Parsing End");
		
		System.out.println("image Parsing Start");
		
		
		String image = null;
		Elements metaOgImage = doc.select("meta[property=og:image]");
		System.out.println(metaOgImage);
		if (metaOgImage != null) {
			image = metaOgImage.attr("content");
		}
		System.out.println("image Parsing End");
		
		System.out.println("description Parsing Start");
		String description = null;
		Elements metaOgDesc = doc.select("meta[property=og:description]");
		if (metaOgDesc != null) {
			description = metaOgDesc.attr("content");
		}
		System.out.println("description Parsing End");
		
		System.out.println("URL Parsing Start");
		String urlAddr = null;
		Elements metaOgUrlAddr = doc.select("meta[property=og:url]");
		System.out.println("if문 진입전");
		if (metaOgUrlAddr != null) {
			System.out.println("if문 시작");
			String transString = metaOgUrlAddr.attr("content");
			System.out.println(transString);
			
			urlInfo.setDetailUrl(transString);
			
			String temp[]  = transString.split("/");
			urlAddr = temp[2];
			
			// split 확인하려고 잠시 for 문 돌림
			/*for (int i = 0; i < temp.length; i++) {
				System.out.println(temp[i]);
			}
			
			System.out.println(urlAddr);
			String[] tempUrl = urlAddr.split(".");
			
			System.out.println("-----------------------------------");
			for (int j = 0; j < tempUrl.length; j++) {
				System.out.println(tempUrl[j]);
				
			}*/
			
			/*if (urlAddr.split(".")[0].equals("www")) {
				urlAddr = urlAddr.substring(4);
			}*/
			
			urlAddr = urlAddr.toUpperCase();
			System.out.println("어퍼서브: " + urlAddr);
		} else {
			System.out.println("og:url 이 읍어");
		}
		
		System.out.println("URL Parsing End");
		
		urlInfo.setTitle("<h2>" + title + "</h2>");
		urlInfo.setImage("<image src='" + image + "' align='left' hspace='12' vspace='12' style= 'height:249px; width:476px;''>");
		urlInfo.setDescription(description);
		urlInfo.setUrlAddr(urlAddr);
		System.out.println("Scrapper End");
		return urlInfo;
		
		//Old 코드
		
	    /*StringBuilder sb = new StringBuilder();
	    Connection con = Jsoup.connect(urlStr);

	     this browseragant thing is important to trick servers into sending us the LARGEST versions of the images 
	    Document doc = con.get();

	    String text = null;
	    Elements metaOgTitle = doc.select("meta[property=og:title]");
	    if (metaOgTitle!=null) {
	        text = metaOgTitle.attr("content");
	    }
	    else {
	        text = doc.title();
	    }

	    String imageUrl = null;
	    Elements metaOgImage = doc.select("meta[property=og:image]");
	    if (metaOgImage!=null) {
	        imageUrl = metaOgImage.attr("content");
	    }

	    if (imageUrl!=null) {
	        sb.append("<img src='");
	        sb.append(imageUrl);
	        sb.append("' align='left' hspace='12' vspace='12' height='276px width='159px'>");
	    }

	    if (text!=null) {
	        sb.append(text);
	    }

	    return sb.toString();*/       
	}
	
	public static UrlInfo UrlForDB(String urlStr) throws Exception {
		System.out.println("HTML parsing Start");
		Connection con = Jsoup.connect(urlStr);
		Document doc = con.get();
		System.out.println("url 정보 얻어옴");
		UrlInfo urlInfo = new UrlInfo();
		
		String title = null;
		Elements metaOgTitle;
		if (doc.select("meta[property=og:title]") != null || doc.select("meta[property=og:title]").equals("")) {
			System.out.println("doc.select: " + doc.select("meta[property=og:title]"));
			System.out.println("meta og:title 있음");
//			metaOgTitle = doc.select("meta[property=og:title]");
			title = doc.select("meta[property=og:title]").attr("content");
			System.out.println("title= " + title);
		}
		
		String image = null;
		Elements metaOgImage = doc.select("meta[property=og:image]");
		System.out.println(metaOgImage);
		if (metaOgImage != null) {
			image = metaOgImage.attr("content");
			System.out.println("image= " + image);
		}
		
		String description = null;
		Elements metaOgDesc = doc.select("meta[property=og:description]");
		if (metaOgDesc != null) {
			description = metaOgDesc.attr("content");
			System.out.println("description= " + description);
		}
		
		String urlAddr = null;
		Elements metaOgUrlAddr = doc.select("meta[property=og:url]");

		if (metaOgUrlAddr != null) {
			String transString = metaOgUrlAddr.attr("content");
			System.out.println("description= " +transString);
			
			urlInfo.setDetailUrl(transString);
			
			String temp[]  = transString.split("/");
			urlAddr = temp[2];
			
			urlAddr = urlAddr.toUpperCase();
			System.out.println("어퍼서브: " + urlAddr);
		} else {
			System.out.println("og:url 이 읍어");
		}
		
		urlInfo.setTitle(title);
		urlInfo.setImage(image);
		urlInfo.setDescription(description);
		urlInfo.setUrlAddr(urlAddr);
		urlInfo.setDetailUrl(urlStr);
		
		return urlInfo;
		
		
	}
}
