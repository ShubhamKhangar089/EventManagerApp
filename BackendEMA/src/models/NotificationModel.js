const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  userId: String,
  eventId: String,
  createdAt: Date
});

module.exports = mongoose.model('Notification', notificationSchema);