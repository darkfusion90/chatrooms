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
    },
    messages: [String]
})


async function modificationPermissionValidator(next) {
    const { roomId, owner } = this.getQuery()
    const docToUpdate = await this.model.findOne({ roomId: roomId })

    //Check owner only if valid document
    //If not valid, 404 Not Found will be sent to client by the callback given to the respective controller
    if (docToUpdate && docToUpdate.owner != owner) {
        next(new UnauthorizedError())
    }
    next()
}

RoomSchema.pre('findOneAndUpdate', modificationPermissionValidator)
RoomSchema.pre('findOneAndDelete', modificationPermissionValidator)

RoomSchema.methods.userHasPermission = function (userId) {
    if (this.type === 'private') {
        return this.owner === userId
    }

    return true
}

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;