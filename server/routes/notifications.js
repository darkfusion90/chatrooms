const isEmpty = require('is-empty')
const { BAD_REQUEST } = require('../constants/httpStatusCodes')
const {
    getNotification,
    getNotificationsMatchingUser,
    updateNotificationStatus
} = require('../controllers/notifications')
const { genericHandlerCallback } = require('./routeUtils')

const get = (req, res) => {
    const { userId, notificationId } = req.params
    const callback = (err, notif) => genericHandlerCallback(err, notif, res)

    if (notificationId) {
        getNotification(notificationId, callback)
    } else {
        getNotificationsMatchingUser(userId, callback)
    }
}

const patch = (req, res) => {
    const { notificationId } = req.params
    const callback = (err, notif) => genericHandlerCallback(err, notif, res)

    const { hasErrors, errors } = validatePatch(req.body)
    if (hasErrors) {
        return res.status(BAD_REQUEST).json(errors)
    }

    const { status } = req.body
    if (status) {
        updateNotificationStatus(notificationId, status, callback)
    }else{
        getNotification(notificationId, callback)
    }
}

const validatePatch = (data) => {
    const isValidStatus = (status) => {
        return ['pending', 'reviewed'].includes(status)
    }

    const errors = {}
    if (data.status && !isValidStatus(data.status)) {
        errors.status = 'Status must be one of \'pending\' or \'reviewed\''
    }

    return { hasErrors: !isEmpty(errors), errors }
}

module.exports = { get, patch }