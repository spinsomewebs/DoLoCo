var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  userId: String
});

module.exports = mongoose.model('Contact', contactSchema);