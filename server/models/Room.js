const mongoose = require('mongoose');
const User = require('./User')
const UnauthorizedError = require('../errors/Unauthorized')

const Schema = mongoose.Schema;

const RoomSchema = Schema({
    roomId: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['private', 'public', 'unlisted'],
        required: true
    },
    createdBy: User,
    messages: [String],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'RoomMember'
    }]
})

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;