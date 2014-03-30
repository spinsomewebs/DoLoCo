var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
  userId: String,
  communityId: String,
  targetGoal: Number,
  currentBalance: Number,
  pictureUrl: String,
  title: String,
  description: {type: String, default: 'New Campaign'}
});

module.exports = mongoose.model('Campaign', campaignSchema);