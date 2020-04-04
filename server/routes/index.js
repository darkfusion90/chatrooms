const path = require('path')

const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const rooms = require('./rooms')
const roomInvitations = require('./roomInvitations')
const user = require('./user')
const notifications = require('./notifications')
const search = require('./search')

const logger = require('../utils/logger')('[Routes: index]')

const index = (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        logger.debug('Production build , dirname: ', __dirname)
        res.sendFile(path.join(__dirname, '../../client/build/index.html'))
    } else {
        logger.debug('Development build')
        res.send('Hello from Development Server!')
    }
}

module.exports = {
    index,
    login,
    logout,
    register,
    rooms,
    user,
    roomInvitations,
    notifications,
    search
}