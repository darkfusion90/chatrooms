const { NOT_IMPLEMENTED } = require('../constants/httpStatusCodes')
const { countAllPublicRooms } = require('../controllers/rooms')
const { genericHandlerCallback } = require('./routeUtils')

const isResourceCountable = (resource) => {
    //Will add more later, whenever required
    return resource === 'rooms'
}

const get = (req, res) => {
    const { resource } = req.params

    if (!isResourceCountable(resource)) {
        return res
            .status(NOT_IMPLEMENTED)
            .json({ error: `Resource "${resource}" doesn't support this functionality` })
    }

    countAllPublicRooms()
        .then(count => res.json({ count }))
        .catch(err => genericHandlerCallback(err, null, res))
}

module.exports = { get }