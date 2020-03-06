const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    atRoom: {
        type: String,
        required: true,
    },
    data: String
})

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message