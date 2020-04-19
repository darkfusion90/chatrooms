const { 
    createRoomJoinRequest 
} = require('../../../controllers/roomJoinRequests')
const { defaultCallback } = require('../../routeUtils')


const post = (req, res) => {
    const { roomId } = req.params
    const { userId: requesterUserId } = req.session

    createRoomJoinRequest(requesterUserId, roomId, defaultCallback(res))
}

module.exports = post
