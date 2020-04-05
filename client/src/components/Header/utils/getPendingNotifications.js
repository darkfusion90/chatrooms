const getPendingNotifications = (notifications) => {
    if (!notifications) {
        return 0
    }

    const notificationIdList = Object.keys(notifications.data)
    const pendingNotifications = []

    notificationIdList.forEach(id => {
        const notification = notifications.data[id]
        if (notification.status === 'pending') {
            pendingNotifications.push(notification)
        }
    })

    return pendingNotifications
}

export default getPendingNotifications