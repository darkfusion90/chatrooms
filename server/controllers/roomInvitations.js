const { RoomInvitation } = require('../models/RoomInvitation')
const isFunction = require('../utils/isFunction')

exports.createInvitation = (invitee, inviter, room, callback) => {
    const promise = new Promise((resolve, reject) => {
        const roomInvitation = new RoomInvitation({ invitee, inviter, room })
        roomInvitation.save().then(resolve).catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}

exports.getInvitation = (invitationId, callback) => {
    const promise = new Promise((resolve, reject) => {
        RoomInvitation.findById(invitationId)
            .then(resolve)
            .catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}

exports.getAllInvitationsOfUser = (user, callback) => {
    const promise = new Promise((resolve, reject) => {
        RoomInvitation.find({ invitee: user })
            .then(resolve)
            .catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}

exports.deleteInvitation = (invitationId, callback) => {
    const promise = new Promise((resolve, reject) => {
        RoomInvitation.findById(invitationId).then(resolve).catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}