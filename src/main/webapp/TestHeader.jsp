<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>꿀팁 팩토리</title>
<style>
  body {
    position: relative;
  }
  html, body {
    height: 100%;
  }
  #header {
    position: relative;
    z-index: 10;
  }
  div {
    display: block;
  }
  body, p, h1, h2, h3, h4, h5, h6, ul, ol, li, dl, dt, dd, table, th, td, form, fieldset, legend,
  input, textarea, button, select {
    margin: 0;
    padding: 0;
    font-family: Malgun Gothic, '맑은 고딕', dotum, '돋움', AppleSDGothicNeo-Regular,Helvetica,sans-serif;
    font-size: 14px;
    color: #000;
    -webkit-appearance: none;
  }
  
  #wrap{
    position: relative;
    min-width: 640px;
    min-height: 100%
  }
  
  #header .header_wrap {
    height: 50px;
    box-shadow: 0 1px 0 rgba(0,0,0,0.08);
    background-color: #f3f1f7;
  }
  
  #header .header_wrap .logo {
    position: absolute;
    z-index: 10;
    top: 15px;
    left: 32px;
    width: 95px;
    height: 16px;
  }
  
  #header .header_wrap .logo .sp {
    width: 95px;
    height: 16px;
    background-position: 0 -20px;
    vertical-align: top;
    /* overflow: hidden; */
  }
  
  #header .header_wrap .top_menu {
    position: relative;
    height: 30px;
    padding: 10px 0 10px 147px;
  }
  
  #header .header_wrap .top_menu .srch_wrap {
    position: relative;
    width: 254px;
    height: 30px;
    padding-right: 36px;
    border-radius: 3px;
  }
  
  #header .header_wrap .top_menu .txt_srch {
    flaot: left;
    width: 100%;
    height: 30px;
    border: 0 none;
    background: none;
    text-indent: 5px;
  }
  
  #header .header_wrap .top_menu .btn_srch {
    position: absolute;
    top: 3px;
    left: -10px;
    width: 36px;
    margin: 0;
  }
  
  #header .header_wrap .top_menu .btn_srch .sp {
    width: 20px;
    height: 20px;
    margin: -10px -10px;
    background-position: 0 -380px;
    display: none;
  }
  
  #header .header_wrap .top_menu a .sp {
    position: absolute;
    top: 50%;
    left: 50%;
  }
</style>
</head>
<body>
<div id="wrap">
  <div id="header">
    <div class="header_wrap">
      <h1 class="logo">
        <a href="#" class="sp">
          <img src="/TeamProject/images/logo.png" width= 90px;/>
        </a>
      </h1>
      
      <div class="top_menu">
      
        <div class="srch_wrap">
          <input type="text" class="txt_srch">
          <a href="#" class="btn_srch">
            <img src="/TeamProject/images/search_icon.png"/>
            <i class="sp">검색</i>
          </a>
        </div>
        
        <div class="top_menu_wrap">
          
        </div>
      </div>
    </div>
  </div>

</div>
</body>
</html>