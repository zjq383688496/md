'use strict';

// 引入主模块
var express = require('express');			// 核心模块
var app = express();
var bodyParser = require('body-parser');	// 解析客户端请求的body中的内容,内部使用JSON编码处理
var compression = require('compression');	// 开启 gzip 压缩
var upload = require('jquery-file-upload-middleware');
var http = require('http');
var MDJS = require('./express/lib/MDJS').MDJS;
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.disable('x-powered-by');

// express工程配置
var config = {
	views:  'express/views',	// views目录
	public: './',			// public目录
	routes: './express/routes'	// 路由目录
};
// 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars');
var hbs = handlebars.create({
	layoutsDir:    config.views+'/layouts/',		// layout目录
	partialsDir:   config.views+'/partials/',		// 局部模块目录
	defaultLayout: 'layout',	// 默认layout名称, 默认: 'main'
	extname: '.hbs',			// 文件后缀名, 默认 '.handlebars'
	helpers: {
		section: function(name, options) {
			if (!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/' + config.views);	// 设置views目录


// 设置占用端口
app.set('port', process.env.PORT || 8000);

// jsonp callback name
app.set('jsonp callback name', '?callback=');

// GZIP压缩
app.use(compression());

// 设置静态资源目录 (临时)
//app.use(express.static(__dirname + '/public'));

// 自动化测试
app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

// 解析 URL 编码 (POST)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser());

// cookie & session
app.use(cookieParser(MDJS.cookie.secret));
app.use(session());

/* 
/* 定义路由
 */
var INDEX = require(config.routes+'/index');		// 首页
// var ABOUT = require(config.routes+'/about');		// 关于我们
// var FORM  = require(config.routes+'/form');			// 表单
// var FORMFILE = require(config.routes+'/form-file');	// 文件上传
// var FORMFILEJQ = require(config.routes+'/form-file-jq');	// 文件上传(jQuery)
var COOKIE = require(config.routes+'/cookie');
// var EMAIL = require(config.routes+'/email');
// var MAP = require(config.routes+'/map');
var ERROR404 = require(config.routes+'/404');		// 404
var ERROR500 = require(config.routes+'/500');		// 500

/*app.use(function (req, res, next) {
	// 如果有即显消息，把它传到上下文中，然后清除它
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});*/

// 路由页面
app.use('/', INDEX);
// app.use('/about', ABOUT);
// app.use('/form', FORM);
// app.use('/form-file', FORMFILE);
// app.use('/form-file-jq', FORMFILEJQ);
app.use(COOKIE);
// app.use('/email', EMAIL);
// app.use('/map', MAP);

// 404 catch-all 处理器（中间件）
app.use(ERROR404);
// 500 错误处理器（中间件）
app.use(ERROR500);

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