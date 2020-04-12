import axios from './config'


export const getMessage = (roomId, messageId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/rooms/${roomId}/messages/${messageId}`).then(onRequestFulfilled, onRequestRejected)
}

export const createMessage = (roomId, message, onRequestFulfilled, onRequestRejected) => {
    return axios.post(`/api/rooms/${roomId}/messages`, { message }).then(onRequestFulfilled, onRequestRejected)
}