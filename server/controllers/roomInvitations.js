const { RoomInvitation } = require('../models/RoomInvitation')
const isFunction = require('../utils/isFunction')

const POPULATE_CONFIG = {
    room: {
        path: 'room',
        model: 'Room',
        select: 'name roomId'
    },
    inviter: {
        path: 'inviter',
        model: 'User',
        select: 'username isRegistered'
    },
    invitee: {
        path: 'invitee',
        model: 'User',
        select: 'username isRegistered'
    }
}

function populateQuery(query) {
    if (query) {
        const { room, invitee, inviter } = POPULATE_CONFIG
        return query.populate(room).populate(invitee).populate(inviter)
    }
}

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
        const query = RoomInvitation.findById(invitationId)
        populateQuery(query).then(resolve).catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}

exports.getAllInvitationsOfUser = (user, callback) => {
    const promise = new Promise((resolve, reject) => {
        const query = RoomInvitation.find({ invitee: user })
        populateQuery(query).then(resolve).catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}

exports.deleteInvitation = (invitationId, callback) => {
    const promise = new Promise((resolve, reject) => {
        const query = RoomInvitation.findById(invitationId)
        populateQuery(query).then(resolve).catch(reject)
    })

    if (isFunction(callback)) {
        promise.then(val => callback(null, val)).catch(callback)
    }

    return promise
}