import axios from './config'


export const getAllNotifications = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/notifications').then(onRequestFulfilled, onRequestRejected)
}

export const markNotificationAsReviewed = (notificationId, onRequestFulfilled, onRequestRejected) => {
    return axios.patch(
        `/api/notifications/${notificationId}`,
        { status: 'reviewed' }
    ).then(onRequestFulfilled).catch(onRequestRejected)
}