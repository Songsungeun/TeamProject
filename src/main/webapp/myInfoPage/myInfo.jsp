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
.mypageMainSector {
border:1px solid black;
width: 929px;
height: 1000px;
margin: 0px 0px 0px 451px;
}
#myHoneyFac {
  height: 40px;
  width: 150px;
  border: solid;
  border-left-color: white;
  border-top-color: white;
  border-right-color: white;
  border-bottom-color: orange;
  text-align: center; 
  float: left;
  font-size: 200%;
  margin: 0px 0px 0px 100px;
}

#subscribeFac {
  height: 40px;
  width: 150px;
  text-align: center; 
  border: solid;
  border-left-color: white;
  border-top-color: white;
  border-right-color: white;
  border-bottom-color: orange;
  float: left;
  font-size: 200%;
  margin: 0px 0px 0px 100px;
}

#record {
  height: 40px;
  width: 150px;
  text-align: center; 
  border: solid;
  border-left-color: white;
  border-top-color: white;
  border-right-color: white;
  border-bottom-color: orange;
  float: left;
  font-size: 200%;
  margin: 0px 0px 0px 100px;
}
.tipFolder {
  border:solid;
  border-left-color: #cccccc;
  border-top-color: #cccccc;
  border-right-color: #cccccc;
  border-bottom-color: #cccccc;
  width: 150px;
  height: 200px;
  float: left;
  margin: 80px;
  font-size: 120%;
  text-align: center;
  color: #737373; 
}
</style>

</head>
 
  
<body>
<jsp:include page="../Header.jsp"></jsp:include>
<jsp:include page="/myInfoPage/MyInfoPageLeftSection.jsp"></jsp:include>
<div class= "mypageMainSector">
<div class="mypageMain" id="myHoneyFac"><a>
  내 꿀팩</a>
</div>

<div class="mypageMain" id="subscribeFac"><a>
  구독 팩토리</a>
</div>

<div class="mypageMain" id="record"><a>
  기록</a>
</div>

<div class="tipFolder">
  <img alt="folder" src="../images/folder.png">
  <br>
  <br>
  <p>공부 꿀팁</p>
  <p>10개</p>
  <p>#java#</p>
</div>

</div>
</body>
</html>