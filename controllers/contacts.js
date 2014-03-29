/**
 * GET /invite-contacts
 * Profile page.
 */

exports.viewContacts = function(req, res) {
  res.render('contacts/index', {
    title: 'Invite Contacts'
  });
};