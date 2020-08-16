const mongoose = require('mongoose')

const Types = mongoose.Schema.Types

const BranchSchema = mongoose.Schema({
    name: {
        type: Types.String,
        required: true
    },
    room: {
        type: Types.String,
        ref: 'Room',
        required: true
    },
    createdAt: {
        type: Types.Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Branch', BranchSchema)
