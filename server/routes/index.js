const path = require('path')
const apiRouter = require('./api')

const index = (_, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    } else {
        res.send('Hello from Development Server!')
    }
}

module.exports = { index, apiRouter }