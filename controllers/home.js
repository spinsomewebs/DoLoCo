var passport = require('passport');
var User = require('../models/User');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
	User.findById(req.session.passport.user, function(err, user) {
	  res.render('home', {
	    title: 'Home',
	    user: user
	  });
	});
};
