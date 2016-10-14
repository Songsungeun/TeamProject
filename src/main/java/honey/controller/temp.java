package honey.controller;

import honey.controller.json.Scrapper;

public class temp {
	public static void main(String[] args) {
		
		String url = "http://media.daum.net/foreign/all/newsview?newsid=20161012180504185";
		
		try {
			String tmp = Scrapper.parsePageHeaderInfo(url);
			System.out.println(tmp);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
