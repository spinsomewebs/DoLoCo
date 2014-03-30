var mongoose = require('mongoose');

var userHistorySchema = new mongoose.Schema({
  userId: String,
  campaignId: Number
});

module.exports = mongoose.model('UserHistory', userHistorySchema);