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
tr{display: table-r ow;}
td, th{display: table-cell;}
ul:after{content:" ";display:block;clear:both;}
body{ font-family:"arial", sans-serif; font-size:12px;}
/*reset*/
body {
  margin:0; 
  padding:0; 
  background-color: #f1f1f1; 
  padding-top: 50px;
  border: 1px red solid;
 }

 #HoneyAdmin_Wrap {
  position : fixed;
  width  : 1280px;
  height : 824px;
  left : 150px;
  margin : 0 auto;
  border : 1px black solid; 
}

#Left_Menu {
  position: fixed;
  width: 150px;
  height: 400px;
  top: 51px;
  left: 150px;
  border: 1px blue solid;
}

#Left_Menu > .l1 > li  {
  text-align: center;
  font-size: 13px;
}

#Left_Menu > .l1 > li > #boldid  {
  text-align: center;
  font-size: 15px;
  font: bold;
}

#Left_Menu > .l2 > li {
  text-align: center;
  font-size: 12px;
}

 #Center_Menu{
  border: 1px yellow solid;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

 #admin_detail{
  position: fixed;
  width: 1127px;
  height: 823px;
  left : 303px;
  background-color: white;
  border: 2px orange solid;
}

</style>
</head>
  
<body>
    <header>
    
    </header>
    
    <section id = "HoneyAdmin_Wrap">
      <div id = "Center_Menu">
        <div id = "Left_Menu">
           <ul class = l1>
           
           <img src="../adminpage/images/photo01.jpeg" width="100%"><br>
           <li id = boldid>ID</li>
           <li>보관소 관리</li> 
           <li>팁 관리</li> 
          </ul>
          <br>
           <ul class = l2>
            <li>메뉴1</li>
            <li>메뉴1</li>
            <li>메뉴1</li>
           </ul>
        </div>
          <div id = admin_detail> 
                  
         </div>
      </div>
        
    </section>
     
    <footer>

    </footer>
  
</body>
</html>










