const config = require('./config')
const passport = require('passport')
const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const logger = require('../utils/logger')('[PassportConfig] ')

passport.serializeUser((user, done) => {
    logger.debug("<Serialize> ", user)
    done(null, user.userId)
})

passport.deserializeUser((userId, done) => {
    User.findOne({ userId: userId }, (err, user) => {
        logger.debug("<Deserialize> ", user)
        done(err, user)
    })
})

passport.use(new PassportLocalStrategy({}, (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            logger.debug('<Strategy> err: ', err)
            return done(err)
        }
        if (!user) {
            logger.debug('<Strategy> no user found: ', user)
            return done(null, false, { reason: 'Incorrect username or password' })
        }
        if (!user.verifyPassword(password)) {
            logger.debug('<Strategy> wrong password: ', user, password)
            return done(null, false, { reason: 'Incorrect username or password' })
        }
        logger.debug('<Strategy> success: ', user)
        return done(null, user)
    })
}))

module.exports = passport