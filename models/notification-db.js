const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title:String,
    details:String
})

const notif = mongoose.model('notification',notificationSchema);
module.exports = notif;