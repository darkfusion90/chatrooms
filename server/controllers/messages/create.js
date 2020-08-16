const Message = require('../../models/Message')
const { getMainBranch } = require('../branches')
const { resolveNoData } = require('../../utils/promiseResults')
const promiseCallbackFunction = require('../../utils/promiseCallbackFunction')

const createMessage = async (author, roomId, branchId, messageData, callback) => {
    const message = Message({
        author,
        atRoom: roomId,
        branch: branchId,
        data: messageData
    })

    return saveMessage(message, callback)
}

const createMainBranchMessage = async (author, roomId, messageData, callback) => {
    const mainBranch = await getMainBranch(roomId)
    if (mainBranch) {
        const message = Message({
            author,
            atRoom: roomId,
            branch: mainBranch._id,
            data: messageData
        })
        return saveMessage(message, callback)
    }

    return resolveNoData(callback)
}

const saveMessage = (message, callback) => promiseCallbackFunction(
    (resolve, reject) => message.save().then(resolve).catch(reject),
    callback
)

module.exports = { createMessage, createMainBranchMessage }