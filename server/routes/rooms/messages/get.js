const {
    defaultCallback,
    handleArrayResponse
} = require('../../routeUtils')
const {
    getMessageFromMainBranch,
    getAllMessagesFromMainBranch,
    getMessageFromBranch,
    getAllMessagesFromBranch,
} = require('../../../controllers/messages')

const get = (req, res) => {
    const { branchId } = req.params
    if (branchId) {
        getNamedBranchMessages(req, res)
    } else {
        getMainBranchMessages(req, res)
    }
}

const getMainBranchMessages = (req, res) => {
    const { roomId, messageId } = req.params

    if (messageId) {
        getMessageFromMainBranch(messageId, roomId, defaultCallback(res))
    } else {
        getAllMessagesFromMainBranch(roomId, handleMultipleMessages(res))
    }
}

const getNamedBranchMessages = (req, res) => {
    const { roomId, branchId, messageId } = req.params

    if (messageId) {
        getMessageFromBranch(messageId, roomId, branchId, defaultCallback(res))
    } else {
        getAllMessagesFromBranch(roomId, branchId, handleMultipleMessages(res))
    }
}

const handleMultipleMessages = (res) => handleArrayResponse(res, 'messages')

module.exports = get