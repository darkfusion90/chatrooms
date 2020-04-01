const { Notification } = require('../models/Notification')
const createPromiseCallbackFunction = require('../utils/promiseCallbackFunction')


const POPULATE_CONFIG = {
    user: {
        path: 'user',
        model: 'User',
        select: 'username isRegistered'
    },
    roomInvitation: [{
        path: 'roomInvitation.invitee',
        model: 'User',
        select: 'username isRegistered'
    }, {
        path: 'roomInvitation.inviter',
        model: 'User',
        select: 'username isRegistered'
    }, {
        path: 'roomInvitation.room',
        model: 'Room',
        select: 'name'
    }]
}

function populateQuery(query) {
    if (query) {
        const { user, roomInvitation } = POPULATE_CONFIG
        return query.populate(user).populate(roomInvitation)
    }
}

const getNotificationDoc = (user, meta) => {
    switch (meta.type) {
        case 'room_invitation':
            return { user, roomInvitation: meta.payload }
        default:
            return { user }
    }
}

exports.createNotification = (user, meta, callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        const notification = new Notification(getNotificationDoc(user, meta))
        notification.save().then(resolve).catch(reject)
    }, callback)
}

exports.getNotification = (notificationId, callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        const query = Notification.findById(notificationId)
        populateQuery(query).then(resolve).catch(reject)
    }, callback)
}

exports.getNotificationsMatchingUser = (user, callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        const query = Notification.find({ user })
        populateQuery(query).then(resolve).catch(reject)
    }, callback)
}

exports.updateNotificationStatus = (notificationId, status, callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        const query = Notification.findByIdAndUpdate(
            notificationId,
            { status },
            { returnOriginal: false }
        )
        populateQuery(query).then(resolve).catch(reject)
    }, callback)
}