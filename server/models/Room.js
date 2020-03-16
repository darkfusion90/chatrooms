const mongoose = require('mongoose');
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'RoomMember' }]
})

RoomSchema.methods.isMember = function (userId) {
    let isRoomMember = false
    this.members.forEach(member => {
        if (member.user && member.user._id.equals(userId)) {
            isRoomMember = true
        }
    })
    return isRoomMember
}

RoomSchema.methods.isAdmin = function (userId) {
    let isRoomAdmin = false
    this.members.forEach(member => {
        if (member.user && member.user._id.equals(userId) && member.memberType === 'admin') {
            isRoomAdmin = true
        }
    })
    return isRoomAdmin
}

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;