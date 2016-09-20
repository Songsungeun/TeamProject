<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style>
@charset "utf-8";
/*reset*/
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var,
b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video { margin: 0; padding: 0; border: 0; outline: 0; font-size: 100%; vertical-align: baseline; background: transparent; }
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section { display: block; }
input,textarea,select,button,table{font-size:inherit;font-family:inherit; font-size: 100%; -webkit-text-size-adjust:none;}
ul,ol,li{list-style:none;}
a{text-decoration:none; color:inherit;}
a:hover, a:focus{text-decoration:underline;}
fieldset{margin:0; padding:0; border:none;} 
caption,legend{position:absolute;top:-5000px;text-indent:-5000px;visibility:hidden;width:0;height:0;font-size:0;line-height:0;}
img{vertical-align:middle;}
table{display: table;}
caption{display: table-caption;}
colgroup{display: table-column-group;}
col{display: table-column;}
thead{display: table-header-group;}
tbody{display: table-row-group;}
tfoot{display: table-footer-group;}
tr{display: table-row;}
td, th{display: table-cell;}
ul:after{content:" ";display:block;clear:both;}
body{ font-family:"arial", sans-serif; font-size:12px;}
/*reset*/
.leftSection {
  background-color: #d9d9d9; width: 250px; height: 1500px; float: left;
  margin: 0px 0px 0px 201px;
}
#myInfo {
  background-color: #d9d9d9; height: 150px; margin: 60px 0px 0px 0px;
  padding: 0px;
}
#userPhoto {float: left; height: 150px; width: 110px; margin: 0px 0px 20px 0px;}
#userID {float: right; font-size: 150%; margin: 15px 0px 0px 0px; width: 100px;}
#newHoneyTip{
  float: right; background-color: orange; font-size: 150%; hight: 40px;
  width: 100px; margin : 40px 15px 0px 0px; border-radius: 10px; text-align: center;
}
.leftSection > a {text-decoration: none;}
.leftSection > a:hover {color: white;}
.myTagAndSearch{
  font-size: 150%; color: #737373; margin: 250px 0px 30px 30px; line-height: 3em;
}

.recommandTip {font-size: 160%; margin: 0; height: 350px; width: 250px;}
#recommandTipBanner {
  margin: 0px 0px 10px 10px; float: left;
}
.refresh {
  float: right; font-size: 60%; color: orange; width: 50px;
  margin: 0px; margin: 5px 5px 0px 0px; font-weight: 900;
}
.recommandpicture1 {
  margin: 10px 0px 0px 0px; height: 120px; width: 120px; 
  float: left;
}
.recommandpicture1 img {
  height: 120px; width: 120px;
}
.recommandpicture1_userName {
  font-size: 70%; float: left; width: 105px; margin: 10px 0px 0px 0px;
  height: 60px; padding: 40px 20px 20px 5px; 
}
.recommandpicture2 {
  margin: 10px 0px 0px 0px; height: 120px; width: 120px;
  float:left;
}
.recommandpicture2 img {
  height: 120px; width: 120px;
}
.recommandpicture2_userName {
  font-size: 70%; float: left; width: 105px;
  height: 60px;  padding: 40px 20px 20px 5px; margin: 10px 0px 0px 0px;
}
</style>

</head>
<body>
<div class=leftSection>
  <div class= leftSection id= myInfo>
    <img id = "userPhoto" alt="userInfo" src="/HoneyTip/images/userPhoto.png" width="70" height="83px">
    <div id="userID"><a href="#">
      사용자 ID
    </a></div>
    <div id="newHoneyTip"><p><a href="#">
      새 꿀팁
    </a></p>
    </div>
    <hr color="black" width=99% >
  </div>
  <div class="myTagAndSearch">
    <li>my 태그</li>
    <li>my 색인</li>
  </div>
  <hr color="black" width=99% >
  <div class="recommandTip">
    <h1 id="recommandTipBanner">추천 꿀팁 저장소</h1>
    <li class="refresh"><a href="#">새로고침</a></li>
    <div class="recommandpicture1"><img alt="추천1" src="/HoneyTip/images/userPhoto.png"></div>
    <li class="recommandpicture1_userName">원지선과 난쟁이들</li>
    <div class="recommandpicture2"><img alt="추천2" src="/HoneyTip/images/userPhoto.png"></div>
    <div class="recommandpicture2_userName">류세현과 외동들</div>
  </div>
  <hr color="black" width=99% >
</div>


</body>
</html>