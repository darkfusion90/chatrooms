const SocketIoSessions = require('../models/SocketIoSession')

const getSocketIdListOfUserId = async (userId) => {
    return new Promise((resolve, _) => {
        const onPromiseRejected = (err) => {
            console.log(`on error mapping userId ${userId} to socket list: `, err)
            resolve([])
        }

        const onPromiseFulfilled = (socketIoSessionDoc) => {
            const socketIdList = socketIoSessionDoc ? socketIoSessionDoc.socketIds : []
            resolve(socketIdList)
        }

        SocketIoSessions.findOne({ userId })
            .then(onPromiseFulfilled)
            .catch(onPromiseRejected)
    })
}

const addSocketIdOfUserId = (userId, socketId) => {
    const update = { $push: { socketIds: socketId } }
    const options = { new: true, upsert: true }
    SocketIoSessions.findOneAndUpdate({ userId }, update, options).exec()
}

const removeSocketIdOfUserId = (userId, socketId) => {

    const update = { $pull: { socketIds: socketId } }
    const options = { new: true }

    SocketIoSessions.findOneAndUpdate({ userId }, update, options).exec()
}

module.exports = { addSocketIdOfUserId, getSocketIdListOfUserId, removeSocketIdOfUserId }