const mongoose = require('mongoose');
const Room = require('./Room');

const UserSchema = new mongoose.Schema({
    user_id: String,
    username: String,
    rooms: [Room]
})

module.exports = mongoose.model('User', UserSchema);