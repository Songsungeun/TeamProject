<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>테스트용</title>
<style>
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p,
	blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd,
	q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr,
	th, td, article, aside, canvas, details, figcaption, figure, footer,
	header, hgroup, menu, nav, section, summary, time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
	vertical-align: baseline;
	background: transparent;
}

article, aside, details, figcaption, figure, footer, header, hgroup,
	menu, nav, section {
	display: block;
}

input, textarea, select, button, table {
	font-size: inherit;
	font-family: inherit;
	font-size: 100%;
	-webkit-text-size-adjust: none;
}

ul, ol, li {
	list-style: none;
}

a {
	text-decoration: none;
	color: inherit;
}

a:hover, a:focus {
	text-decoration: underline;
}

fieldset {
	margin: 0;
	padding: 0;
	border: none;
}

caption, legend {
	position: absolute;
	top: -5000px;
	text-indent: -5000px;
	visibility: hidden;
	width: 0;
	height: 0;
	font-size: 0;
	line-height: 0;
}

img {
	vertical-align: middle;
}

table {
	display: table;
}

caption {
	display: table-caption;
}

colgroup {
	display: table-column-group;
}

col {
	display: table-column;
}

thead {
  border: 1px solid green;
	display: table-header-group;
}

tbody {
	display: table-row-group;
}

tfoot {
	display: table-footer-group;
}

tr {
	display: table-row;
}

td, th {
	display: table-cell;
}

ul:after {
	content: " ";
	display: block;
	clear: both;
}

body {
	font-family: "arial", sans-serif;
	font-size: 12px;
}

#wrap {
  border: 1px solid lightgrey;
	position: absolute;
	height: 400px;
	width: 900px;
	left: 15%;
	right: 20%;
	top: 140%;
	padding-bottom: 50px;
}

#drivename {
	position: absolute;
	top: -1px;
	width: 100%;
	left: -1px;
	border: 1px solid gray;
	font-size: 20px;
	background-color: orange;
}

#search {
	position: absolute;
	top: 30px;
	left: 583px;
	width: 100%
}

#topbuttons {
	position: absolute;
	float: left;
	top: 60px;
	width: 100%;
	left: 20px;
}

table {
	position: absolute;
	top: 80px;
	width: 600px;
	height: 200px;
	left: 0px;
	text-align: center;
}

table thead {
	text-decoration: underline;
}

tbody tr:hover {
	background-color: skyblue;
}

.b2 {
	position: absolute;
	right: 40px;
}

#b2_01 {
	position: absolute;
	right: 90px;
}

#filelist {
	border-top: 1px solid lightgrey;
	margin: 20px;
	margin-left: 30px;
	width: 800px;
	height: 20px;
	text-align: center;
}

.toptable {
  margin: 100px;
}

.checkboxes {
  width: 30px;
  margin-right: 10px;
  margin-left: -3px;
}

.topcheckbox {
  width: 30px;
  margin-right: 10px;
  margin-left: 15px;
}

#classarea {
  height: 400px;
  width: 850px;
  margin-left: 20px;
  margin-top: 90px;
}

.toptable1 {
  padding-left: 50px;
  padding-right: 50px;
}

.toptable2 {
  padding-left: 30px;
  padding-right: 30px;
}

#container {
min-height: 100%; 
position: relative;
background: #0202F7 url('images/gr.jpg') 0 70px repeat-x;
}

#header {
height: 70px;
background-color: white;
}

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
<div id="container">
  <header id="header">
	<jsp:include page="/Header.jsp"></jsp:include>
  </header>
	<div id="wrap">
		<div id="drivename">HoneyDrive</div>

		<div id="search">
			<input>
			<button>검색</button>
		</div>

		<div id="topbuttons">
			<input class="topcheckbox" type="checkbox"></input>
			<button class="b1">올리기</button>
			<button class="b1">내려받기</button>
			<button id=b2_01 class="b2">삭제</button>
			<button id=b2_02 class="b2">새폴더</button>
		</div>
		<section id="classarea">
		  <table id="filelist">
		    <thead>
		    <tr>
		      <th><input class="checkboxes" type="checkbox"></th>
		      <th class="toptable1">파일명</th>
          <th class="toptable2">종류</th>
          <th class="toptable2">크기</th>
          <th class="toptable2">수정한날짜</th>
          <th class="toptable2">올린 날짜</th>
		    </tr>
		    
		    </thead>
		    <tbody>
		    <tr>
          <td><input class="checkboxes" type="checkbox"></td>
          <td>뉴폴더</td>
          <td>폴더</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
		    <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>file1</td>
          <td>zip</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>file2!!!</td>
          <td>zip</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>abcdef!!!</td>
          <td>zip</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>므훗!!!</td>
          <td>zip</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>엣헴!!!</td>
          <td>doc</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>백문이!!!</td>
          <td>egg</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>불여!!!</td>
          <td>7zip</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>일시행!!!</td>
          <td>ppt</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
        <tr class="filelist">
          <td><input class="checkboxes" type="checkbox"></td>
          <td>화이팅!!!</td>
          <td>xls</td>
          <td>E^E</td>
          <td>2016-09-12</td>
          <td>2016-09-12</td>
        </tr>
		    </tbody>
		  </table>
		</section>
		</div>
</div>
		
	<footer id="footer">
	<jsp:include page="/Footer.jsp"></jsp:include>
	</footer>
		
		
</body>
</html>

