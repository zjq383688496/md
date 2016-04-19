var express = require('express');
var app = express();
var router = express.Router();
var AppConfig = require('../md_config');
var config = new AppConfig();
var MDJS = require('../lib/MDJS').MDJS;


/* GET form. */
router.get('/', function(req, res, next) {
	res.render('form/form', config);
})
.post('/submitPOST.do', function(req, res, next) {
	config.userform = null;
	var body  = req.body,
		url   = 'form-error';
	if (body.username && body.sex) {
		body.method = 'post';
		url = 'form-success';
		config.userform = body;
	}
	res.redirect(303, url);
})
.get('/submitGET.do', function(req, res, next) {
	config.userform = null;
	var query  = req.query,
		url   = 'form-error';
	if (query.username && query.sex) {
		query.method = 'get';
		url = 'form-success';
		config.userform = query;
	}
	res.redirect(303, url);
})
.get('/form-success', function(req, res, next) {
	res.render('form/form-success', config);
})
.get('/form-error', function(req, res, next) {
	res.render('form/form-error', config);
});

module.exports = router;