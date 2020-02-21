const { genericHandlerCallback } = require('./routeUtils')
const { getUser } = require('../controllers/users')

const get = (req, res) => {
    let userId;
    //In case of "/api/user/:id", the id passed in url will be used
    //In case of "/api/user", the id will be taken from the session of the client
    if (req.params.id) {
        userId = req.params.id
    }
    else if (req.session.userId) {
        userId = req.session.userId
    }

    getUser(userId, (err, user) => genericHandlerCallback(err, user, res))
}

module.exports = { get }
