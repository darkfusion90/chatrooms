const getNotificationTitle = (notification) => {
    if (notification.roomInvitation) {
        return 'Room Invitation'
    }
    return null
}

export { getNotificationTitle }