package honey.controller.json;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

public class Scrapper {

	String url;
	String selector = "img";
	Document doc;
	Elements titles;
	String urlInfo;
	public Scrapper() {}
	public Scrapper(String url) throws Exception {
		this.url = url;
		doc = getDocument(url);
		titles = doc.select(selector);
	}
	
	public Document getDocument(String url) throws Exception {
		return Jsoup.connect(url).get();
	}
	
	public String returnInfo() {
		urlInfo = "";
		for (Element e : this.titles) {
			urlInfo += e.text();
			urlInfo += "\n";
		}
		return urlInfo;
	}
	
	
}
