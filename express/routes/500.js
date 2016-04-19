var express = require('express');
var router = express.Router();
var MDJS = require('../lib/MDJS').MDJS;

/* 500 错误处理器（中间件） */
router.use(function(err, req, res, next){
	console.error(err.stack);
	MDJS.message['500'](res);
});

module.exports = router;