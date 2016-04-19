'use strict';
var dir = 'dist';		// 生成目录
var globalConfig = {
	revSrc: dir + '/rev',
	'beta': {
		id:   'beta',
		name: '开发环境',
		//path: dir + '/beta'
		path: dir + '/prd'
	},
	'prd': {
		id:   'prd',
		name: '生产环境',
		path: dir + '/prd'
	}
};

var gulpConfig = function (envPath) {
	envPath = envPath? envPath: 'beta';
	// 环境
	var flag = envPath === 'prd'? true: false;
	var globalEnv = globalConfig[envPath];
	var globalSrc = 'public';
	var viewSrc   = 'express';
	var lessSrc   = globalSrc + '/less';
	var sassSrc   = globalSrc + '/sass';
	var ES6Src    = globalSrc + '/es6';
	var imgSrc    = globalSrc + '/img';
	var coffeeSrc = globalSrc + '/coffee';
	var jsSrc     = globalSrc + '/js';
	var fontSrc   = globalSrc + '/font';
	var config = {
		flag: flag,
		defSrc:  dir,
		defPath: globalEnv.path,
		cleanSrc: [dir, viewSrc+'/views_zip'],
		/* 读取目录 */
		lessSrc:   [lessSrc+'/*.less', lessSrc+'/**/*.less', '!'+lessSrc+'/global.less', '!'+lessSrc+'/{mixins,other,style}/*.less', '!'+lessSrc+'/{mixins,other,style}/**/*.less'],
		sassSrc:   [sassSrc+'/*.scss', sassSrc+'/**/*.scss', '!'+sassSrc+'/global.scss', '!'+sassSrc+'/{mixins,other,style}/*.scss', '!'+sassSrc+'/{mixins,other,style}/**/*.scss'],
		cssSrc:    [globalEnv.path+'/**/*.css', '!'+globalEnv.path +'/**/*.min.css', '!'+globalEnv.path +'/font/style.css'],
		ES6Src:    [ES6Src+'/*.js', ES6Src+'/**/*.js'],
		coffeeSrc: [coffeeSrc+'/*.coffee', coffeeSrc+'/**/*.coffee'],
		jsSrc:     [globalEnv.path+'/**/*.js', '!'+globalEnv.path+'/**/*.min.js'],
		jsSrc2:    [jsSrc+'/*.*', jsSrc+'/**/*.*'],
		oldImgSrc: [imgSrc+'/*.{jpg,jpeg,png,gif,ico,svg}', imgSrc+'/**/*.{jpg,jpeg,png,gif,ico,svg}'],
		fontSrc:   [fontSrc+'/style.css', fontSrc+'/**/*.{eot,svg,ttf,woff}'],
		imgSrc:    [globalEnv.path+'/**/*.{jpg,jpeg,png,gif,ico,svg}'],
		/* 写入目录 */
		cssDest:  globalEnv.path + '/css',
		jsDest:   globalEnv.path + '/js',
		imgDest:  globalEnv.path + '/img',
		fontDest: globalEnv.path + '/font',
		/* 版本号目录 */
		revSrc:     globalConfig.revSrc,
		revHbsSrc:  [globalConfig.revSrc+'/**/*.json', viewSrc+'/views/*.hbs', viewSrc+'/views/**/*.hbs'],
		revCssSrc:  [globalConfig.revSrc+'/**/*.json', globalEnv.path+'/**/*.css', '!'+globalEnv.path +'/**/*.min.css', '!'+globalEnv.path +'/font/style.css'],
		revJsSrc:   [globalConfig.revSrc+'/**/*.json', globalEnv.path+'/**/*.js', '!'+globalEnv.path+'/**/*.min.js'],
		revCssDesc: globalConfig.revSrc + '/css',
		revJsDesc:  globalConfig.revSrc + '/js',
		revImgDesc: globalConfig.revSrc + '/img',
		/* watch */
		watchSrc: [globalSrc+'/**/*.{less,js,coffee,jpg,png}', viewSrc+'/**/*.hbs'],
		/* views目录 */
		viewSrc:  [viewSrc+'/views/*.hbs', viewSrc+'/views/**/*.hbs'],
		viewDesc: viewSrc+'/views_zip',
		/* 打包目录 */
		zipSrc:   this.defSrc,
		zipName:  'maidou.zip'	// 压缩包名称
	}
	return config;
}

module.exports = gulpConfig;