const passport = require('passport')
const PassportLocalStrategy = require('passport-local').Strategy
const { getUser, getUserByUsername, filterUsingProjections } = require('../controllers/users')
const logger = require('../utils/logger')('[PassportConfig] ')

const getUserWithoutPasswordField = (user) => {
    return filterUsingProjections(user)
}

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((userId, done) => {
    getUser(userId, done)
})

passport.use(new PassportLocalStrategy({}, (username, password, done) => {
    getUserByUsername(username, true, (err, user) => {
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
        return done(null, getUserWithoutPasswordField(user))
    })
}))

module.exports = passport