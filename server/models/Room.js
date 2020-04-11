const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = Schema({
    _id: Schema.Types.String,
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
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = { RoomSchema, Room: mongoose.model("Room", RoomSchema) };