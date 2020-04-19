const {
    getJoinRequest,
    getAllJoinRequestsInRoom
} = require('../../../controllers/roomJoinRequests')
const { defaultCallback } = require('../../routeUtils')


const get = (req, res) => {
    const { roomId, requestId } = req.params

    if (requestId) {
        getJoinRequest(roomId, requestId, defaultCallback(res))
    } else {
        getAllJoinRequestsInRoom(roomId, defaultCallback(res))
    }
}

module.exports = get