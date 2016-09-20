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

.headmain {
   width: 1180px; padding: 0; height: 55px; margin: 0 auto;}
.headnav {
  margin: 0 auto; padding: 0; background-color: orange;
  height: 55px; position: fixed; width: 1180px;
}
.headPageShift {margin: 0.5px 0px 0px 0px; list-style: none; float: left;}
.headlogo {
  margin: 10px 10px 10px 20px; padding: 0; float: left;
  font-size: 25px; font-weight: bold;
  }
.headlogo a:hover {text-decoration: none;}
.headlist {margin:15px; float: left; font-size: 15px;}
.headlist > a:hover {color: white;}
.headlist > a {text-decoration: none;}
.rightOption {margin: 10px 20px 10px 10px; float: right;}
.seachBar {margin: 5px; float: left;}
.searchimg {cursor: pointer;}
.searchdropdown {position: relative; display: inline-block;}
.searchOption {
  display: none; position: absolute; background-color:
  #F6C171;width: 283px;height: 70px; right: 0;
}
 
.searchOption div {
  color: black; padding: 0; margin: 3px; text-decoration: none;
}

.op1 {
  margin: 0; padding: 0; width: 133px; height: 28px; border: 1px solid black;
  float: left; text-align: center; font-size: 20px;
}

.op2 {
  margin: 0; padding: 0; width: 62.5px; height: 24px; border: 1px solid black;
  float: left; text-align: center; font-size: 16px;
}
.searchOption a:hover {text-decoration: none;}
.searchOption > div:hover {background-color: #E69F34;}
.searchdropdown:hover .searchOption {display: inline;}
.userStatus {padding: 0px 0px 0px 30px; float: left;}
input{
  font-size: 120%; background-color: #FAE0D4; color: black; width: 250px;
}
.userStatus{
  border: 1px solid black; border-radius: 15px; width: 30px; height: 30px;
  margin: 1px 0px 0px 5px; padding: 0;
}
.userStatus .userStatusMargin {margin: 7.5px 4px 0px 4px;}
.userStatus:hover {background-color: #B5A47D; opacity:.40;}
.statusBar {
  border: 1px solid black; width: 16px; height: 2px; margin: 2px auto;
  background-color:black; border-radius: 2px;
}
</style>
</head>
<body>
<head>
   <main class="headmain">
     <nav class="headnav">
       <header class="headheader">
         <ul class="headPageShift">
           <li class="headlogo"><a href="/ggulfac/css/GgulFacMainPageT1.jsp">로고</a></li>
           <li class="headlist"><a href="../css/GgulFacMainPage.jsp">홈</a></li>
           <li class="headlist"><a href="#">인기</a></li>
           <li class="headlist"><a href="../myInfoPage/myInfo.jsp">내 커뮤니티</a></li>
           <li class="headlist"><a href="../css/GgulFacCloudMainPage2.jsp">cloud</a></li>
         </ul>
          
        <div class="rightOption">
          <div class="seachBar"><input name=search type=text placeholder="검색어 입력">
            <div class="searchdropdown">
              <a class="searchimg" href="#"><img src="/HoneyTip/images/searchbutton.png" width="25"/>
                <div class="searchOption">
                  <div class="op1"><a href="#">전체</a></div>
                  <div class="op1"><a href="#">내게시물</a></div>
                  <div class="op2"><a href="#">꿀팁인</a></div>
                  <div class="op2"><a href="#">제목</a></div>
                  <div class="op2"><a href="#">내용</a></div>
                  <div class="op2"><a href="#">테그</a></div>
                </div>
              </a>
            </div>
          </div>
          <a class="userStatus" href="#">
            <div class="userStatusMargin">
              <div class="statusBar" id="topBar"></div>
              <div class="statusBar" id="midBar"></div>
              <div class="statusBar" id="botBar"></div>
            </div>
          </a>
        </div>
        
       </header>
     </nav>
   </main>
</head>
</body>
</html>