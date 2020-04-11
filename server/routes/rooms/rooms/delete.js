const { genericHandlerCallback } = require('../../routeUtils')
const { deleteRoom } = require('../../../controllers/rooms')

const _delete = (req, res) => {
    deleteRoom(req.params.roomId, (err, room) => {
        const responseData = { 'nDeleted': room ? 1 : 0 }
        genericHandlerCallback(err, responseData, res)
    })
}


module.exports = _delete