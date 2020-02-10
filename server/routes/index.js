const path = require('path')
const apiRouter = require('./api')


const index = (req, res) => {
    if (!req.session.userId) {
        
    }
    else {
        console.log('Old User. UserId: ' + req.session.userId)
    }

    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    } else {
        res.send('Hello from Development Server!')
    }
}


module.exports = { index, apiRouter }