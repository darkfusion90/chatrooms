const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SocketIoSessionSchema = new Schema({
    userId: {
        type: Schema.Types.String,
        required: true,
        unique: true,
        index: true
    },
    socketIds: {
        type: [Schema.Types.String],
        required: true,
    }
})

const SocketIoSession = mongoose.model('SocketIoSession', SocketIoSessionSchema)

module.exports = SocketIoSession