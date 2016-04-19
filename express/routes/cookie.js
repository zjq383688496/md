var express = require('express');
var router = express.Router();
var AppConfig = require('../md_config');
var config = new AppConfig();


/* GET cookie. */
/*router.get('/', function(req, res, next) {
	//res.cookie('monster', 'nom nom');
	//res.cookie('signed_monster', 'nom nom', { signed: true, httpOnly: true });
	//res.cookie('cookie', 'jimmy', { signed: true, path: '/cookie' });
	res.render('cookie', config);
});*/

/* GET session. */
router.get(function(req, res, next) {
	// req.session.userName = 'jimmy';
	// var colorScheme = req.session.colorScheme || 'dark';
	
	//delete req.session.userName;
	//console.log(req.cookie);
	res.render('cookie', config);
});

module.exports = router;
