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
	res.render('form/form-file', {
		year: now.getFullYear(),
		month: now.getMonth()
	});
})
.post('/file/:year/:month', function(req, res, next) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		if(err) return res.redirect(303, '/form/form-error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files:');
		console.log(files);
		res.redirect(303, '/form/form-success');
	});
});

module.exports = router;