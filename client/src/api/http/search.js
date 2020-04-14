import axios from './config'

export const searchUsers = (username, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/search?category=user&query=${username}`)
        .then(onRequestFulfilled, onRequestRejected)
}

export const searchRoomMember = (roomId, userId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/search?category=room_member&userId=${userId}&roomId=${roomId}`)
        .then(onRequestFulfilled, onRequestRejected)
}