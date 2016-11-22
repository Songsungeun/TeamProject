package honey.controller.json;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import honey.vo.UrlInfo;


public class Scrapper {

	public static UrlInfo parsePageHeaderInfo(String urlStr) throws Exception {
		System.out.println("HTML parsing Start");

		System.out.println("url 연결 시작");

		System.out.println("naver Blog check");
		String[] checkUrl = urlStr.split("/");

		for (int i = 0; i < checkUrl.length; i++) {
			System.out.println("checkUrl= " + checkUrl[i]);
		}

		if (checkUrl[2].equals("blog.naver.com")) {
			urlStr = checkUrl[0] + "//" + checkUrl[2] + "PostView.nhn?blogId=" + checkUrl[3] + "&logNo=" + checkUrl[4];
		}
		Document doc = Jsoup.connect(urlStr).timeout(30000).get();
		System.out.println("url 소스 긁어옴");

		UrlInfo urlInfo = new UrlInfo();

		String title = null;
		System.out.println("title start");
		Elements metaOgTitle = doc.select("meta[property=og:title]");
		if (metaOgTitle != null) {
			title = metaOgTitle.attr("content");
		}

		System.out.println("image start");
		String image = null;
		Elements metaOgImage = doc.select("meta[property=og:image]");
		if (metaOgImage != null) {
			image = metaOgImage.attr("content");
		}

		System.out.println("description start");
		String description = null;
		Elements metaOgDesc = doc.select("meta[property=og:description]");
		if (metaOgDesc != null) {
			description = metaOgDesc.attr("content");
		}

		System.out.println("urlAddr Start");
		String urlAddr = null;
		Elements metaOgUrlAddr = doc.select("meta[property=og:url]");

		if (metaOgUrlAddr != null) {
			String transString = metaOgUrlAddr.attr("content");

			urlInfo.setDetailUrl(transString);

			String temp[]  = transString.split("/");
			urlAddr = temp[2];

			urlAddr = urlAddr.toUpperCase();
		} else {
			System.out.println("og:url 이 읍어");
		}


		urlInfo.setTitle("<h2>" + title + "</h2>");
		urlInfo.setImage("<image src='" + image + "' align='left' hspace='12' vspace='12' style= 'height:249px; width:476px;''>");
		urlInfo.setDescription(description);
		urlInfo.setUrlAddr(urlAddr);
		return urlInfo;

	}

	public static UrlInfo UrlForDB(String urlStr) throws Exception {
		System.out.println("HTML parsing Start");

		System.out.println("url 연결 시작");
		System.out.println("naver Blog check");
		String[] checkUrl = urlStr.split("/");

		for (int i = 0; i < checkUrl.length; i++) {
			System.out.println("checkUrl= " + checkUrl[i]);
		}
		if (checkUrl[2].equals("blog.naver.com")) {
			if(!urlStr.contains("PostView")) {
				urlStr = checkUrl[0] + "//" + checkUrl[2] + "/PostView.nhn?blogId=" + checkUrl[3] + "&logNo=" + checkUrl[4];
			}
		} 
		
			System.out.println("urlStr= " + urlStr);
			Connection con = Jsoup.connect(urlStr);
			Document doc = con.timeout(10000).get();
			UrlInfo urlInfo = new UrlInfo();

			if (checkUrl[2].equals("blog.daum.net") && (!checkUrl[3].substring(0, 5).equals("_blog"))) {
				System.out.println("frame if 진입");
				System.out.println("substring= " + checkUrl[3].substring(0, 5));
				urlStr = "http://blog.daum.net" + doc.select("frame").attr("src");
				con = Jsoup.connect(urlStr);
				doc = con.timeout(10000).get();
			}
			System.out.println("title start");
			// 제목 파싱 시작!!
			String title = null;
			
			//meta Data에 property로 네이밍한 경우
			if (!doc.select("meta[property=og:title]").isEmpty()) {
				//	metaOgTitle = doc.select("meta[property=og:title]");
				title = doc.select("meta[property=og:title]").attr("content");

				// meta Data에 name으로 네이밍한 경우
			} else if (!doc.select("meta[name=og:title]").isEmpty()) {
				title = doc.select("meta[name=og:title]").attr("content");
			
			} else if (!doc.select("meta[name=twitter:title]").isEmpty()) {
				title = doc.select("meta[name=twitter:title]").attr("content");
			} else if (!doc.select("meta[itemprop=headline]").isEmpty()) {
				title = doc.select("meta[itemprop=headline]").attr("content");
			} else if (doc.select("meta[name=title]").isEmpty()) {
				title = doc.select("meta[name=title]").attr("content");
			
			// meta Data에 정보 등록 하지 않은 경우
			} else if (!doc.title().isEmpty()) {
				title = doc.title();
			}

			System.out.println("image start");
			String image = null;
			Elements metaOgImage = doc.select("meta[property=og:image]");
			if (!doc.select("meta[property=og:image]").isEmpty()) {
				image = metaOgImage.attr("content");

			} else if (!doc.select("meta[name=og:image]").isEmpty()) {
				image = doc.select("meta[name=og:image]").attr("content");
			} else if (!doc.select("meta[itemprop=image]").isEmpty()) {
				image = doc.select("meta[itemprop=image]").attr("content");
			} else if (!doc.select("meta[name=twitter:image]").isEmpty()) {
				image = doc.select("meta[name=twitter:image]").attr("content");
			} else if (!doc.select("link[rel=image_src]").isEmpty()) {
				image = doc.select("link[rel=image_src]").attr("href");
			}

			System.out.println("description start");
			String description = null;
			//meta Data에 property로 네이밍한 경우
			if (!doc.select("meta[property=og:description]").isEmpty()) {
				description = doc.select("meta[property=og:description]").attr("content");

			} else if (!doc.select("meta[name=og:description]").isEmpty()) {
				description = doc.select("meta[name=og:description]").attr("content");
			} else if (!doc.select("meta[itemprop=description]").isEmpty()){
				description = doc.select("meta[itemprop=description]").attr("content");
			} else if (!doc.select("meta[name=twitter:description]").isEmpty()) {
				description = doc.select("meta[name=twitter:description]").attr("conetent");
			} else if (!doc.select("meta[name=description]").isEmpty()) {
				description = doc.select("meta[name=description]").attr("content");
			} 
			
			if (description == null) {
				description = "";
			} else if (description.length() > 254) {
				String cutString = description.substring(0, 254);
				description = cutString;
			} //description 너무 많이 넣어놓은 나쁜 사이트들 때문에...
			 

			System.out.println("url Parsing start");
			// url Parsing 시작!!
			String urlAddr = null;
			Elements metaOgUrlAddr = doc.select("meta[property=og:url]");

			if (!doc.select("meta[property=og:url]").isEmpty()) {
				String transString = doc.select("meta[property=og:url]").attr("content");
				String temp[]  = transString.split("/");

				urlAddr = temp[2];

				urlAddr = urlAddr.toUpperCase();

			} else if (!doc.select("meta[name=og:url]").isEmpty()){
				String transString = doc.select("meta[name=og:url]").attr("content");
				String temp[]  = transString.split("/");


				urlAddr = temp[2];

				urlAddr = urlAddr.toUpperCase();
				System.out.println("어퍼서브: " + urlAddr);
			} else if (!doc.select("meta[itemprop=url]").isEmpty()) {
				String transString = doc.select("meta[itemprop=url]").attr("content");
				String temp[]  = transString.split("/");
				urlAddr = temp[2];
				urlAddr = urlAddr.toUpperCase();
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

