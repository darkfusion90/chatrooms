const { Notification } = require('../models/Notification')
const createPromiseCallbackFunction = require('../utils/promiseCallbackFunction')

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
        Notification.findById(notificationId).then(resolve).catch(reject)
    }, callback)
}

exports.getNotificationsMatchingUser = (user, callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        Notification.find({ user }).then(resolve).catch(reject)
    }, callback)
}

exports.updateNotificationStatus = (notificationId, status, callback) => {
    return createPromiseCallbackFunction((resolve, reject) => {
        Notification.findByIdAndUpdate(notificationId, { status }, { returnOriginal: false })
            .then(resolve).catch(reject)
    }, callback)
}