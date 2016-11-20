//요청 파라미터 값 추출하기 - 쿼리스트링 분석기 사용
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pool = mysql.createPool({
	connectionLimit : 10,
	host     : 'localhost',
	user     : 'java85',
	password : '1111',
	database : 'honeydb',
	port : '3306'
});

//express 모듈에 보조장치 장착한다.
app.use(bodyParser.json());	// JSON 형식으로 넘어온 데이터 처리 
app.use(bodyParser.urlencoded({extended:true}))

app.post('/TeamProject/membership/nickNameChecker.json', function(request, response) {
	console.log(request.body.nickName)

	pool.query(
			"select count(MB_NICK) as cnt from honey_membs where MB_NICK=?",
			[request.body.nickName],
			function(err, rows, fields) {
				response.writeHead(200, {
					'Content-Type' 					: 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin'	: '*',
					'Access-Control-Allow-Methods'	: 'POST, GET, OPTIONS, DELETE',
					'Access-Control-Max-Age'		: '3600',
					'Access-Control-Allow-Headers'	: 'x-requested-with'
				});
				if(err){ 
					console.log(err);
				}

				if (rows[0].cnt == 0) {
					response.write(JSON.stringify({
						'state':'success'
					}));
				} else {
					response.write(JSON.stringify({
						'state':'fail'
					}));			
				}
				response.end();
			})
});

app.listen(8001);
console.log("서버 실행중...");