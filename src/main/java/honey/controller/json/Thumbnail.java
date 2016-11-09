package honey.controller.json;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

public class Thumbnail {
	public static void createImage(String loadFile, String saveFile, int zoom) throws IOException{
		File save = new File(saveFile);
		FileInputStream fis = new FileInputStream(loadFile);
		BufferedImage im = ImageIO.read(fis);
		
		if (zoom<=0) zoom = 1;
		
		int width = 50;//im.getWidth() / zoom;
		int height = 50;//im.getHeight() / zoom;
		
		BufferedImage thumb = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics2D g2 = thumb.createGraphics();
		
		g2.drawImage(im, 0, 0, width, height, null);
		ImageIO.write(thumb, "jpg", save);
		
	}
	
	public static void main(String args[]){
		String loadFile = "/Users/songsungeun/Desktop/동영상 2016. 11. 2. 오후 9.51.mov";
		String saveFile = "/Users/songsungeun/Downloads/이미지 테스트용/dong.jpg";
		int zoom = 5;
		
		try {
			Thumbnail.createImage(loadFile, saveFile, zoom);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
