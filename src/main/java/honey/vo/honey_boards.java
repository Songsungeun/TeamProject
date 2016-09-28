package honey.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class honey_boards implements Serializable{
  private static final long serialVersionUID = 1L;

  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
  protected int no;
  protected String title;
  protected String url;
  protected String contents;
  protected Date createdDate;     // 이제 java.sql.Date 타입으로 날짜 정보를 제대로 다뤄보자!
  protected String createdDate2;  // 클라이언트가 사용할 문자열 형식의 날짜
  protected int like;
  protected int viewCount;
}
