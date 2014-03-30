var Campaign = require('../models/Campaign');

/**
 * GET /campaign/new
 * Fill out form for new campaign
 */

exports.newCampaign = function(req, res) {
	res.render('campaign/new', {
		title: 'Create New Campaign',
		communityId: req.params.communityId
	});
};

/**
 * POST /campaign/create
 * Create New Campaign
 */

exports.createCommunity = function(req, res) {
	var campaign = new Campaign({
		userId: req.session.passport.user,
		communityId: ,
		description: req.body.description,
		pictureUrl: req.body.image,
		title: req.body.title
	});

	community.save(function(err) {
	    if (err) {
	      if (err.code === 11000) {
	        req.flash('errors', { msg: err });
	      }
	      return res.redirect('/community/new');
	    }
	    res.redirect('/community/invite/'+ community._id);
	});
};