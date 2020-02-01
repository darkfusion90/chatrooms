const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = Schema({
    id: String,
    name: String,
    type: {
        type: String,
        enum: ['private', 'public', 'unlisted']
    },
    owner: String
})

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;