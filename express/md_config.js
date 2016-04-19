"use strict";
//构建各配置项
var globalConfig = {
	// 生产环境
	'prd': {
		serverPath:  '//www.maidou.com',
		staticPath:  '//s.maidou.com',
		dynamicPath: '//i.maidou.com'
	},
	// 测试环境
	'beta': {
		serverPath:  '//www.md.com',
		staticPath:  '//s.md.com',
		dynamicPath: '//i.md.com'
	}
};

function appConfig(envPath) {
	envPath = envPath? envPath: 'beta';
	var env = globalConfig[envPath];
	var config = {};

	for (var i in env) {
		config[i] = env[i];
	}
	return config;
}

module.exports = appConfig;
