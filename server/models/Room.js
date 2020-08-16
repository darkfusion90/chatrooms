const { createMainBranch } = require('../controllers/branches')
const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const RoomSchema = new mongoose.Schema({
    _id: Types.String,
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
        type: Types.ObjectId,
        ref: 'User',
        immutable: true,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
})

RoomSchema.pre('save', function (next, _) {
    if (this.isNew) {
        createMainBranch(this._id).then(mainBranch => console.log({ mainBranch }))
    }

    next()
})

module.exports = { RoomSchema, Room: mongoose.model('Room', RoomSchema) }
