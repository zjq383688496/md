var express = require('express');
var router = express.Router();
var AppConfig = require('../md_config');
var config = new AppConfig();
var MDJS = require('../lib/MDJS').MDJS;


/* GET home. */
router.get('/', function(req, res, next) {
	/*var url = 'http://172.17.0.234:8001/user/'
	var page = req.query.user;
	page = page? page: '';
	url += page;
	MDJS.http.get(url, function (data) {
		config.user = data;
		if (data) {
			res.render('home', config);
		} else {
			MDJS.error['500'](res);
		}
	}, function (err) {
		MDJS.error['404'](res);
		console.log('Got error: ' + err.message);
	});*/
	//console.log(req.cookies);
	res.render('home', config);
});

module.exports = router;