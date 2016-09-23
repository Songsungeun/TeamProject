<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style>
body {
width: 100%; 
height: 100%; 
margin: 0; 
padding: 0;
position: absolute;
}
.login_background {
width: 1180px; 
height: 780px;
 margin:0 auto;
 position: absolute;
 }
.login_background .background_opacity {
  width: 880px; 
  height: 780px; 
  margin:0 auto; 
  padding: 0; 
  float: left;
  background-color: gray; 
  opacity: .30; 
  position: absolute;
}
.rightSection {
  position: absolute; width: 300px; height: 780px; background-color: #E89922;
  margin: 0px 0px 0px 880px; padding: 0;
}
.loginInfo {width: 200px; margin: 50px 50px; position: absolute;}
.loginInfo_IdPw {width: 173px; margin: 5px auto;}
.loginInfo_IdPw input{width: 173px; margin: 5px auto;}
.login_Button {
  width: 118px; margin:5px 40px 5px 40px; padding: 0; height: 30px; color: white; background-color: black;
  cursor: pointer; display: inline-block; border:1px solid black; border-radius: 10px;
  font-size: 15px; font-weight: 900;
}
#facebook_login {
  border:1px solid #3385F7; border-radius: 10px; background-color: #3385F7; width: 178px;
  height: 40px; text-align: center; color: white; font-size: 16px; padding: 0px;
  margin: 5px 10px 5px 10px; cursor: pointer;
}
#kakao_login {
  border:1px solid #7D4004; border-radius: 10px; background-color: #7D4004; width: 178px;
  height: 40px; text-align: center; color: yellow; font-size: 16px; padding: 0px;
  margin: 5px 10px 5px 10px; cursor: pointer;
}
#sign_up {
  text-decoration: none; font-size: 13px; text-align: center; margin: 2px auto 0px auto;
}
</style> 
</head>
<body>
<div class="login_background">
  <div class="background_opacity" href="#"></div>
  <div class="rightSection">
    <div class="loginInfo">
      <div class="loginInfo_IdPw" id="input_id"><input name=id type=text placeholder="아이디"></div>
      <div class="loginInfo_IdPw" id="input_pw"><input name=password type=password placeholder="비밀번호"></div>
      <button class="login_Button" href="#">로 그 인</button>
      <button id="facebook_login" href="#">페이스북으로 로그인</button>
      <button id="kakao_login" href="#">카카오톡으로 로그인</button>
      <p id="sign_up"><a href="#">회원가입</a></p>
    </div>
  </div>
</div>
</body>
</html>