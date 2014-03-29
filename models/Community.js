var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
  organizerId: String,
  memberUserIds: Array,
  description: {type: String, default: 'New Community'}
});