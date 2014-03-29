var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
  userId: String,
  communityId: String,
  targetGoal: Number,
  currentBalance: Number,
  description: {type: String, default: 'New Campaign'}
});