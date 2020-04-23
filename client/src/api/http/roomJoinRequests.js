import axios from './config'

export const sendJoinRequest = (roomId, onRequestFulfilled, onRequestRejected) => {
    return axios.post(`/api/rooms/${roomId}/join_requests`)
        .then(onRequestFulfilled, onRequestRejected)
}

export const getAllJoinRequestByCurrentUser = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/join_requests')
        .then(onRequestFulfilled, onRequestRejected)
}