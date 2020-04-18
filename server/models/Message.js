const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    author: {
        type: Schema.Types.String,
        required: true,
    },
    atRoom: {
        type: Schema.Types.String,
        required: true,
    },
    data: String,
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now
    }
})

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message