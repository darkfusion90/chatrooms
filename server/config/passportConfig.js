const passport = require('passport')
const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.serializeUser((user, done) => {
    console.log("SERIALIZE ", user)
    done(null, user.userId)
})

passport.deserializeUser((userId, done) => {
    User.findOne({ userId: userId }, (err, user) => {
        console.log('Deserialize: ', user)
        done(err, user)
    })
})

passport.use(new PassportLocalStrategy({}, (userId, password, done) => {
    User.findOne({ userId: userId }, (err, user) => {
        if (err) {
            console.log('Strategy err: ', err)
            return done(err)
        }
        if (!user) {
            console.log('Strategy no userId: ', user)
            return done(null, false, { message: 'Invalid userId' })
        }
        if (!user.verifyPassword(password)) {
            console.log('Strategy wrong password: ', user, password)
            return done(null, false, { message: 'Invalid password' })
        }
        console.log('Strategy success: ', user)
        return done(null, user)
    })
}))

module.exports = passport