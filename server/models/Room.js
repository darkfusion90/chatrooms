const mongoose = require('mongoose');
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
    owner: {
        type: String,
        required: true,
        index: true
    }
})


RoomSchema.pre('findOneAndUpdate', async function (next) {
    const { roomId, owner } = this.getQuery()
    const docToUpdate = await this.model.findOne({ roomId: roomId })
    if (docToUpdate.owner != owner) {
        next(new UnauthorizedError())
    }
    next()
})

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;