var passport = require('passport');
var User = require('../models/User');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
	if (req.session.passport.user) {
		User.findById(req.session.passport.user, function(err, user) {
		  res.render('home', {
		    title: 'Home',
		    user: user
		  });
		});
	} else {
		res.render('home', {
			title:'Home',
			user: null
		})
	}
};
