var passport = require('passport');
var Community = require('../models/Community');
var Contact = require('../models/Contact');
var Campaign = require('../models/Campaign');

/**
 * GET /community
 * List Communities
 */

exports.listCommunities = function(req, res) {
	var allCommunities = [];

	Community.find({'organizerId': req.session.passport.user}).exec(function (err, communities) {
		for (var i = 0; i < communities.length; i++) {
			var community = communities[i];

			community['isOrganizer'] = true;

			allCommunities.push(community);
		}

		Community.find({'memberUserIds': req.session.passport.user}).exec(function (err, communities) {
			for (var i = 0; i < communities.length; i++) {
				var community = communities[i];

				community['isOrganizer'] = false;

				allCommunities.push(community);
			}

			res.render('community/index', {
				title: 'Your Circles',
				communities: allCommunities
			})
		});
	});
};

/**
 * GET /community/:communityId
 * List all campaigns in a community
 */

exports.listCampaigns = function(req, res) {

	Campaign.find({'communityId': req.params.communityId}).exec(function (err, campaigns) {
		res.render('community/campaigns', {
			title: 'Circle Campaign',
			'campaigns': campaigns,
			'communityId': req.params.communityId
		});
	});
};

/**
 * GET /community/new
 * Fill out form for new community
 */

exports.newCommunity = function(req, res) {
	res.render('community/new', {
		title: 'Create New Circle'
	});
};

/**
 * POST /community/create
 * Insert new community into the database
 */

exports.createCommunity = function(req, res) {
	var community = new Community({
		organizerId: req.session.passport.user,
		memberUserIds: [],
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

/**
 * GET /community/invite
 * Fill out form for new community
 */

exports.inviteContacts = function(req, res) {
	Contact.find({'userId': req.session.passport.user}).exec(function (err, contacts) {
			res.render('contacts/index', {
				'title': 'Invite Contacts',
				'communityId': req.params.communityId,
				'contacts': contacts
			});
	});
};