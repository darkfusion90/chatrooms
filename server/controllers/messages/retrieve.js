const Message = require('../../models/Message')
const { getMainBranch } = require('../branches/retrieve')
const { executeQuery } = require('./utils')

const getMessage = (messageId, roomId, callback) => {
    const query = Message.findOne({ _id: messageId, atRoom: roomId })

    return executeQuery(query, callback)
}


const getAllMessagesOfRoom = (roomId, callback) => {
    const query = Message.find({ atRoom: roomId })

    return executeQuery(query, callback)
}


const getMessageFromBranch = (messageId, roomId, branchId, callback) => {
    const query = Message.findOne({ _id: messageId, atRoom: roomId, branch: branchId })

    return executeQuery(query, callback)
}


const getMessageFromMainBranch = async (messageId, roomId, callback) => {
    const mainBranch = await getMainBranch(roomId)
    if (mainBranch) {
        const query = Message.findOne({ _id: messageId, atRoom: roomId, branch: mainBranch._id })
        return executeQuery(query, callback)
    }

    return Promise.resolve(null)
}

const getAllMessagesFromMainBranch = async (roomId, callback) => {
    const mainBranch = await getMainBranch(roomId)
    if (mainBranch) {
        console.log({mainBranch});
        const query = Message.find({ atRoom: roomId, branch: mainBranch._id })
        return executeQuery(query, callback)
    }

    return Promise.resolve(null)
}

const getAllMessagesFromBranch = (roomId, branchId, callback) => {
    const query = Message.find({ atRoom: roomId, branch: branchId })

    return executeQuery(query, callback)
}

module.exports = {
    getAllMessagesOfRoom,
    getMessage,
    getMessageFromMainBranch,
    getAllMessagesFromMainBranch,
    getAllMessagesFromBranch,
    getMessageFromBranch,
}
