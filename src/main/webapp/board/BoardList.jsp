<%@ page import="honey.vo.HoneyBoard"%>
<%@ page import="java.util.List"%>
<%@ page language="java" 
         contentType="text/html; charset=UTF-8"
	       pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>      	       
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시물 목록조회</title>
</head>
<body>
	<h1>게시물 목록조회2</h1>
	<c:forEach items="${list}" var="board">
    &{board.boardNo},
    &{board.memberNo},
    &{board.categoryNo},
		&{board.title},
		&{board.URL},
		&{board.contents},
		&{board.createdDate},
		&{board.likeCount},
		&{board.viewCount}<br>
		
		<IMG src=http://cfile6.uf.tistory.com/image/252D564E5730AF1C1DF484 border=1><br>
		
		<a href="http://www.chogeosung.com/102 " target="_blank" 
		title="move">
		확인하기</a>
		
	</c:forEach>
</body>
</html>

