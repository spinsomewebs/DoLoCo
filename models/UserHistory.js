var mongoose = require('mongoose');

var campaignSchema = new mongoose.Schema({
  userId: String,
  campaignId: Number
});