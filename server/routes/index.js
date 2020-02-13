const path = require('path')
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const userInfo = require('./userInfo')

const index = (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    } else {
        res.send('Hello from Development Server!')
    }
}

module.exports = { index, login, logout, register, userInfo }