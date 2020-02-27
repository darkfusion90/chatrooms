const { getMessage } = require('../controllers/messages')
const { genericHandlerCallback } = require('./routeUtils')

const get = (req, res) => {
    getMessage(req.params.id, (err, message) => genericHandlerCallback(err, message, res))
}

module.exports = {get}