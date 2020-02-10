const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: undefined //This field is set to undefined by default. Adding here only for clarity
    },
    roomsOwned: {
        type: [String],
        default: []
    },
    isRegistered: {
        type: Boolean,
        required: true
    }
    /*
        A "registered" user uses login information to access the app
        In contrast, a user who hasn't registered yet uses session cookies to access the app
        (Which expires after a given amount of consistent inactivity,
            following which the user is removed from the database)
    */
})

UserSchema.index({ 'expiresAt': 1 }, { expireAfterSeconds: 0 })

/**
 * Note: DON'T change this function(){} to an ES6 style arrow function
 * Reason: arrow functions change the semantics of "this" keyword hence may affect how mongoose handles Schema methods
 * Link: https://stackoverflow.com/questions/36794709/inside-schema-method-scopes-this-is-empty-in-mongoose-4-4-12
 */
UserSchema.methods.verifyPassword = function (password) {
    return this.password === password
}

module.exports = mongoose.model('User', UserSchema);