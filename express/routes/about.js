var express = require('express');
var router = express.Router();
var AppConfig = require('../md_config');
var config = new AppConfig();

/* GET about. */
router.get('/', function(req, res) {
	config.pageTestScript = '/qa/tests-about.js';
	res.render('about', config);
});

module.exports = router;