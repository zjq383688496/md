var express = require('express');
var router = express.Router();
var AppConfig = require('../md_config');
var config = new AppConfig();
var MDJS = require('../lib/MDJS').MDJS;
var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport('SMTP', {
	service: 'Gmail',
	auth: {
		user: MDJS.email.gmail.user,
		pass: MDJS.email.gmail.password
	}
});

/* GET email. */
router.get('/', function(req, res, next) {
	console.log(MDJS.email.gmail.user, MDJS.email.gmail.password);
	res.render('email', config, function () {
		mailTransport.sendMail({
			from: '"Jimmy Zhuang" <zjq383688496work@gmail.com>',
			to: '547039528@qq.com',
			subject: 'Your Meadowlark Travel Tour',
			text: 'Thank you for booking your trip with Meadowlark Travel. ' + 'We look forward to your visit!',
		}, function(err){
			if(err) console.error('Unable to send email: ' + err);
		});
	});
});

module.exports = router;
