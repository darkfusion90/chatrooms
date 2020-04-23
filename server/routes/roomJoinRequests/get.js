const {
    getJoinRequestInRoom,
    getAllJoinRequestsInRoom,
    getJoinRequestByUser,
    getAllJoinRequestsByUser
} = require('../../controllers/roomJoinRequests')
const { defaultCallback } = require('../routeUtils')


const byRoom = (req, res) => {
    const { roomId, requestId } = req.params

    if (requestId) {
        getJoinRequestInRoom(roomId, requestId, defaultCallback(res))
    } else {
        getAllJoinRequestsInRoom(roomId, defaultCallback(res))
    }
}

const byUser = (req, res) => {
    const { requestId } = req.params
    const { userId } = req.session

    if (requestId) {
        getJoinRequestByUser(userId, requestId, defaultCallback(res))
    } else {
        getAllJoinRequestsByUser(userId, defaultCallback(res))
    }
}


module.exports = {
    byUser,
    byRoom
}