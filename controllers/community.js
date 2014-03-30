var passport = require('passport');
var Community = require('../models/Community');
var Contact = require('../models/Contact');
var Campaign = require('../models/Campaign');
var User = require('../models/User');

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

/**
 * GET /community/join/:communityId
 * Join a community
 */

exports.joinCommunity = function (req, res) {
	var communityId = req.params.communityId;

	Community.findById(communityId, function (err, community) {
		res.render('community/join', {
			'community': community
		})
	});
}

/**
 * POST /community/createCommunityUser
 * Adds a user to a community
 */

exports.createCommunityUser = function (req, res) {
	Community.findById(req.body.communityId, function (err, community) {
		var currentMembers = community.memberUserIds;
		if (req.session.passport.user) {
			if (req.session.passport.user !== community.organizerId) {
				currentMembers.push(req.session.passport.user);
				community.memberUserIds = currentMembers;

				community.save(function (err) {
					res.redirect('/community/' + req.body.communityId);
				});
			} else {
				community.save(function (err) {
					res.redirect('/community/' + req.body.communityId);
				});
			}
		} else {
			  var user = new User({
			    email: req.body.email,
			    password: req.body.password
			  });

			  user.save(function(err) {
			    if (err) {
			      if (err.code === 11000) {
			        req.flash('errors', { msg: 'User with that email already exists.' });
			      }
			      res.redirect('/community/join/' + req.body.communityId);
			    }

			    currentMembers.push(user._id);
			    community.memberUserIds = currentMembers;

				community.save(function (err) {
					res.redirect('/community/' + req.body.communityId);
				});
			  });
		}
	});
}