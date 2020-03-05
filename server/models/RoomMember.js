const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { UserSchema } = require('./User')


const RoomMemberSchema = new Schema({
    user: {
        type: UserSchema,
        required: true,
        unique: false
    },
    memberType: {
        type: String,
        enum: ['participant', 'admin'],
        required: true,
    }
})

module.exports = mongoose.model('RoomMember', RoomMemberSchema)