var Campaign = require('../models/Campaign');
var User = require('../models/User');

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

exports.createCampaign = function(req, res) {
	var campaign = new Campaign({
		userId: req.session.passport.user,
		communityId: req.body.communityId,
		description: req.body.description,
		pictureUrl: req.body.image,
		title: req.body.title,
		targetGoal: req.body.target
	});

	campaign.save(function(err) {
	    if (err) {
	      if (err.code === 11000) {
	        req.flash('errors', { msg: err });
	      }
	      return res.redirect('/campaign/new');
	    }
	    res.redirect('/campaign/'+ campaign._id);
	});
};

/**
 * GET /campaign/join/:campaignId
 * Page for a single campaign
 */

exports.get = function(req, res) {
	Campaign.findById(req.params.campaignId, function (err, campaign) {
		if (err) return next(err);

		User.findById(campaign.userId, function (err, user) {
			if (err) return next(err);

			res.render('campaign/index', {
				title: campaign.title,
				'campaign': campaign,
				'user': user
			});
		});
	});
};