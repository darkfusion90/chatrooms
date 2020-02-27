const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
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

const Message = mongoose.model('message', MessageSchema)
module.exports = Message