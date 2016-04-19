// 引入主模块
var express = require('express');
var app = express();
var compression = require('compression');
var http = require('http');
// express工程配置
var config = {
	views:  'express/views_zip',	// views目录
	routes: './express/routes'		// 路由目录
};
// 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars');
var hbs = handlebars.create({
	layoutsDir:    config.views+'/layouts/',		// layout目录
	partialsDir:   config.views+'/partials/',		// 局部模块目录
	defaultLayout: 'layout',	// 默认layout名称, 默认: 'main'
	extname: '.hbs'				// 文件后缀名, 默认 '.handlebars'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/' + config.views);	// 设置views目录


// 设置占用端口
app.set('port', process.env.PORT || 8000);


// 设置静态资源目录 (临时)
app.use(express.static(__dirname + '/public'));

// 自动化测试
app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


/* 
/* 定义路由
 */
var INDEX = require(config.routes+'/index');		// 首页
var ABOUT = require(config.routes+'/about');		// 关于我们
var FORM  = require(config.routes+'/form');			// 表单
var ERROR404 = require(config.routes+'/404');		// 404
var ERROR500 = require(config.routes+'/500');		// 500

// GZIP压缩
app.use(compression());

// 路由页面
app.use('/', INDEX);
app.use('/about', ABOUT);
app.use('/form', FORM);

// 404 catch-all 处理器（中间件）
app.use('/', ERROR404);
// 500 错误处理器（中间件）
app.use('/about', ERROR500);

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