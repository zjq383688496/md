'use strict';

var express = require('express');			// 核心模块
var app = express();

// 设置占用端口
app.set('port', process.env.PORT || 8000);


app.use(function (req, res, next) {
	console.log('\n\nALLWAYS');
	next();
});
app.get('/a', function (req, res) {
console.log('/a: 路由终止');
	res.send('a');
});
app.get('/a', function (req, res) {
	console.log('/a: 永远不会调用');
});
app.get('/b', function (req, res, next) {
	console.log('/b: 路由未终止');
	next();
});
app.use(function (req, res, next) {
	console.log('SOMETIMES');
	next();
});
app.get('/b', function (req, res, next) {
	console.log('/b (part 2): 抛出错误');
	throw new Error('b 失败');
});
app.use('/b', function (err, req, res, next) {
	console.log('/b 检测到错误并传递');
	next(err);
});
app.get('/c', function (err, req) {
	console.log('/c: 抛出错误');
	throw new Error('c 失败');
});
app.use('/c', function (err, req, res, next) {
	console.log('/c: 检测到错误但不传递');
	next();
});
app.use(function (err, req, res, next) {
	console.log('检测到未处理的错误 : ' + err.message);
	res.send('500 - 服务器错误 ');
});
app.use(function (req, res) {
	console.log('未处理的路由');
	res.send('404 - 未找到');
});


// 创建web服务
function startServer() {
	app.listen(app.get('port'), function() {
		console.log('http://localhost:' + app.get('port'));
	});
}
if (require.main === module) {
	// 应用程序直接运行；启动应用服务器
	startServer();
} else {
	// 应用程序作为一个模块通过 "require" 引入 : 导出函数
	// 创建服务器
	module.exports = startServer;
}