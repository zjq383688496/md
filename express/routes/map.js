var express = require('express');
var router = express.Router();
var AppConfig = require('../md_config');
var config = new AppConfig();
var MDJS = require('../lib/MDJS').MDJS;


/* GET home. */
router.get('/', function(req, res, next) {
	config.mapKey = MDJS.mapKey;
	res.render('map', config);
});

module.exports = router;