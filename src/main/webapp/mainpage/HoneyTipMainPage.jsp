<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE>
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

.mainsector {
  width:1278px;
  height: 500px;
  margin: 0 auto;
}
.adform {
  width: 710px;
  padding: 70px 0px 0px 0px;
  height: 250px;
  margin: 0 auto;
}
.video {
  margin: 0 auto;
  height: 250px;
  float: left;
  width: 448px;
  padding: 0px 10px 0px 0px;
}
.bestform {
  padding: 0px 0px 0px 0px;
  float: left;
  width: 250px;
  height: 248px;
  border: 1px solid black;
}
.videoimg {
  padding: 0px 10px 0px 0px;
  width: 448px;
  height: 250px;
}
.feeds {
  text-align: center;
}
.besttop {
  font-size: 20px;
  padding: 5px 0px 5px 10px;
  border-bottom: 3px solid gray;
}
.bestlist {
  font-size: 15px;
  font-style: bold;
  padding: 2px 0px 2px 0px;
  border-bottom: 2px solid black;
}
.bestul {
  padding: 0px 12px 0px 12px;
}
.thumbbound {
  padding: 0px 50px 20px 50px;
  width: 326px;
  height: 350px;
  float: left;
}
.thumbimg {
  width: 326px;
  height: 250px;
}
.imgsize{
  width: 326px;
  height: 250px;
} 
.thumbtext {
  height: 100px;
  border: 1px solid black;
  font-size: 30px;
  overflow: hidden;
  text-align: center;
}
.thumbtext:hover {background-color: #c1c1c1;}
.thumbtext > a:hover {text-decoration: none;}

#footer {
position: fixed;
bottom: 0;
width: 100%;
height: 50px;
background-color: silver;
text-align: center;
font-size: 25px;
}
</style>
</head>
<body>
<jsp:include page="/Header.jsp"></jsp:include>
<section class="mainsector">
	<div class="adform">
		<div class="video"><img class="videoimg" src="/HoneyTip/images/hyoju.jpg"></div>
		<div class="bestform">
		  <ul class="bestul">
		    <li class="besttop">BEST</li>
		    <li class="bestlist"><a href="#">1. 철한행님아</a></li>
		    <li class="bestlist"><a href="#">2. 고만 자</a></li>
		    <li class="bestlist"><a href="#">3. 쫌!!</a></li>
		  </ul>
		</div>
	</div>
	<br> <br>
  <p class="feeds">피드들</p><br> <br>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji1.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji2.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji3.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji1.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji2.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji3.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji1.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji2.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
  <div class="thumbbound">
    <div class="thumbimg"><img class="imgsize" src="/HoneyTip/images/suji3.jpg"></div>
    <div class="thumbtext"><a href="#"> 썸네일 </a></div>
  </div>
</section>
</head>
<footer id="footer">
  <jsp:include page="/Footer.jsp"></jsp:include>
  </footer>
</body>
</html>
