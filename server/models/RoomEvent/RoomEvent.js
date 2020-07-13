const mongoose = require('mongoose')

const roomEventTypes = require('../../constants/roomEventTypes')

const RoomEventSchema = new mongoose.Schema({
    type: {
        type: mongoose.Schema.Types.String,
        enum: [...Object.values(roomEventTypes)]
    },
    meta: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
})


module.exports = mongoose.model('RoomEvent', RoomEventSchema)