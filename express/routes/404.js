var express = require('express');
var router = express.Router();
var MDJS = require('../lib/MDJS').MDJS;

/* 404 catch-all 处理器（中间件） */
router.use(function(req, res, next){
	MDJS.message['404'](res);
});

module.exports = router;