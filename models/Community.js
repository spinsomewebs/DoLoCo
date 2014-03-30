var mongoose = require('mongoose');

var communitySchema = new mongoose.Schema({
  organizerId: String,
  memberUserIds: Array,
  pictureUrl: String,
  title: String,
  description: {type: String, default: 'New Community'}
});

module.exports = mongoose.model('Community', communitySchema);