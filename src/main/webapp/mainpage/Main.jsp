<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style>
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
body {margin:0; padding:0; background-color: #f1f1f1; padding-top: 50px;}
.mainpage_wrap {
  width: 1280px;
  margin:0 auto;
}
.mainpage_wrap .mainpage_topcontainer {
  height: 290px;
  margin-top: 25px;
  border: 1px solid black;
}
.mainpage_wrap .mainpage_midcontainer {
  heigth: 500px;
  border: 1px solid black;
}
.mainpage_wrap .mainpage_botcontainer {
  heigth: 500px;
  margin-top: 25px;
  border: 1px solid black;
}
.mainpage_wrap .mainpage_topcontainer .banner {
  width: 581px;
  height: 232px;
  margin: 19px 9px 19px 29px;
  padding: 9px;
  border: 1px solid black;
  float: left;
  background-color: black;
  border-radius: 10px;
}
.mainpage_wrap .mainpage_topcontainer .pop_list {
  width: 599px;
  height: 250px;
  margin: 19px 29px 19px 9px;
  border: 1px solid black;
  float: right;
}
</style>
</head>
<body>
  <header>

  </header>
  <section class="mainpage_wrap">
    <div class="mainpage_topcontainer">
      <video class="banner"
             src="/TeamProject/mainpage/mainpage_images/mamamoo-newyorkMV.mp4"
             controls></video>
      <div class="pop_list">pop_list</div>
    </div>
    <div class="mainpage_midcontainer">midcontainer
    </div>
    <div class="mainpage_botcontainer">botcontainer
    </div>
  </section>
  <footer>

  </footer>
</body>
</html>