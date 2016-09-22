<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>꿀팁 팩토리</title>
<style>
  div {
    border: 1px solid #cccccc;
    text-align: center;
    font-family:: "돋움"
  }
  
  body {
    background-color: #f1f1f2;
  }
  #write_header {
    border: 1px solid #cccccc;
    width: 100%;
    height: 50px;
    padding: 0;
    margin: 0;
    text-align: center;
    background-color: white;
  }
  #body_wrap {
    border: 1px solid black;
    max-width: 1280px;
    margin: 30px auto;
    padding: 0;
    background-color: white;
    height: 600px;
    vertical-align: center;
  }
  
  #body_wrap .write_wrap .write_top ul {
    list-style-type: none;
  }
  
  #body_wrap .write_wrap .write_top ul li {
    float: left;
    margin-left: 15px;
  }
  
  #body_wrap .write_wrap .write_top ul li #category{
    margin-left: 70px;
  }
  
  #body_wrap .write_wrap .write_top ul li input {
    font-size: 15px;
  }
  
  .write_top #category {
    font-size: 15px;
  }
</style>
</head>
<body>
<header id="write_header">
  헤더 영역
</header>

<div id="body_wrap">
  <form class="write_wrap">
    <fieldset class="write_top">
      <ul>
        <li>
          <select id="category">
            <option value="life">라이프</option>
            <option value="sports">스포츠</option>
            <option value="car">차</option>
            <option value="game">게임</option>
            <option value="entertaiment">TV/연예</option>
            <option value="music">음악</option>
            <option value="movie">영화</option>
            <option value="int">지식/교양</option>
            <option value="couple">연애</option>
            <option value="etc">기타</option>
          </select>
        <li><label>제목</label><input type="text" size="80" id="title">
      </ul>
    </fieldset>
    <div>
      <img src="images/editor.PNG" width= "1000">
    </div>
  </form>
</div>
</body>
</html>