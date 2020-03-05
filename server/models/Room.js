const mongoose = require('mongoose');
const { UserSchema } = require('./User')

const Schema = mongoose.Schema;

const RoomSchema = Schema({
    roomId: {
        type: String,
        required: true,
        index: true,
        unique: true,
        immutable: true
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
    createdBy: {
        type: UserSchema,
        immutable: true,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'RoomMember' }]
})

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;