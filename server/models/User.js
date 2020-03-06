const mongoose = require('mongoose');
const MongooseDuplicateKeyError = require('../errors/MongooseDuplicateKeyError')

/*
    A "registered" user uses login information to access the app
    In contrast, a user who hasn't registered yet uses session cookies to access the app
    (Which expires after a given amount of consistent inactivity,
        following which the user is removed from the database)
*/
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true
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
    isRegistered: {
        type: Boolean,
        required: true
    }
})

UserSchema.index({ 'expiresAt': 1 }, { expireAfterSeconds: 0 })

function duplicateKeyErrorHandler(err, _, next) {
    if (err.name === 'MongoError' && err.code === 11000) {
        let msg = '';
        if (err.keyValue.username) {
            msg = 'username already exists'
        }
        next(new MongooseDuplicateKeyError('User', msg, err.keyValue));
    } else {
        next();
    }
}

UserSchema.post('save', duplicateKeyErrorHandler);
UserSchema.post('update', duplicateKeyErrorHandler);
UserSchema.post('findOneAndUpdate', duplicateKeyErrorHandler);
UserSchema.post('insertMany', duplicateKeyErrorHandler);

/**
 * Note: DON'T change this function(){} to an ES6 style arrow function
 * Reason: arrow functions change the semantics of "this" keyword hence may affect how mongoose handles Schema methods
 * Link: https://stackoverflow.com/questions/36794709/inside-schema-method-scopes-this-is-empty-in-mongoose-4-4-12
 */
UserSchema.methods.verifyPassword = function (password) {
    return this.password === password
}

module.exports = { UserSchema: UserSchema, User: mongoose.model('User', UserSchema) }