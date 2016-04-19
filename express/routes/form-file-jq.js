var express = require('express');
var app = express();
var router = express.Router();
var formidable = require('formidable');
var AppConfig = require('../md_config');
var config = new AppConfig();
var MDJS = require('../lib/MDJS').MDJS;


/* GET form. */
router.get('/', function(req, res, next) {
	var now = new Date();
	res.render('form/form-file-jq');
});

module.exports = router;