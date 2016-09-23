<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
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

.header_main {
  width: 100%;padding: 0; height: 50px; margin: 0 auto; background-color: red}
.header_nav {
  margin: 0 auto; 
  padding: 0; 
  background-color: #f1f1f2;
  height: 48px; 
  position: fixed; 
  width: 100%;
}
.headPageShift {
  margin: 0.5px 0px 0px 0px; 
  list-style: none; 
  float: left;}
.headlogo {
  margin: 8px 10px 10px 20px; 
  padding: 0; 
  float: left;
  font-size: 25px; 
  font-weight: bold;
  }
.headlogo a:hover {text-decoration: none;}
.headlist {margin:13px 13px 13px 25px; float: left; font-size: 15px; font-weight: bold;}
.headlist > a:hover {color: white;}
.headlist > a {text-decoration: none;}

.rightOption {
  margin: 10px;
  float: right; 
  width : 50%;
  position: relative;
  }

.seachBar {margin: 5px; float: left;}
.searchimg {cursor: pointer;}
.searchdropdown {position: relative; display: inline-block;}
.searchOption {
  display: none; position: absolute; background-color:
  #f1f1f2;width: 283px;height: 70px; right: 0;
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
.searchOption > div:hover {background-color: #f1f1f2;}
.searchdropdown:hover .searchOption {display: inline;}

.newWright {
  float: left;
  margin: 5px 0px 0px 50px; 
  font-weight: bold;
}
.newWright a:hover {text-decoration: none;}

.confirmLogin{
  float: left;
  margin: 7px 0px 0px 200px;
}
.userStatus {
  padding: 0px 0px 0px 30px;
  float: right;
  margin: 0px;
  }
  
input{
  font-size: 120%; background-color: #FAE0D4; color: black; width: 250px;
}

#nav-icon1 {
  width: 27px;
  height: 20px;
  position: relative;
  margin: 5px 13px 0px 0px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
  float: right;
}

#nav-icon1 span {
  display: block;
  position: absolute;
  height: 5px;
  width: 100%;
  background: #404040;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
  top: 0px;
}

#nav-icon1 span:nth-child(2) {
  top: 7px;
}

#nav-icon1 span:nth-child(3) {
  top: 14px;
}

#nav-icon1.open span:nth-child(1) {
  top: 18px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

#nav-icon1.open span:nth-child(3) {
  top: 18px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
</style>
<!-- jqueryui.com 참고 -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">
  <style>
  #toggle {
    margin : 50px 0px 0px 0px;
    float : right;
  }
  </style>
  <script src="//code.jquery.com/jquery-1.12.4.js"></script>
  <script src="//code.jquery.com/ui/1.12.0/jquery-ui.js"></script>

</head>
<body>
<head>

   <main class="header_main">
     <nav class="header_nav">
       <header class="headheader">
         <ul class="headPageShift">
           <li class="headlogo"><a href="#">로고</a></li>
           <li class="headlist"><a href="#">내 커뮤니티</a></li>
         </ul>
          
        <div class="rightOption">
        
          <div class="seachBar"><input name=search type=text placeholder="검색어 입력">
            <div class="searchdropdown">
              <a class="searchimg" href="#"><img src="../images/searchbutton.png" width="25"/>
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
          
          <div class= "newWright">
            <a href="#"><ul><li>새 게시물</li></ul></a>
          </div>
          
          <div class="confirmLogin">
            <ul>
              <li>로그인 하세요</li>
            </ul>
          </div>
          
          
          <div id="nav-icon1">
            <span></span>
            <span></span>
            <span></span>
          </div>
          
        </div>
        

       </header>
     </nav>
   </main>

</head>
<div id="toggle"><jsp:include page="LoginPage.jsp"></jsp:include></div>
<script>
$("#nav-icon1").click(function() {
$( "#toggle" ).toggle( "right" );
});
</script>
</body>
</html>