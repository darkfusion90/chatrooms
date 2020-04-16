import axios from './config'


export const joinRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    return axios.post(`/api/rooms/${roomId}/members`)
        .then(onRequestFulfilled, onRequestRejected)
}

export const leaveRoom = (roomId, memberId, onRequestFulfilled, onRequestRejected) => {
    return axios.delete(`/api/rooms/${roomId}/members/${memberId}`)
        .then(onRequestFulfilled, onRequestRejected)
}