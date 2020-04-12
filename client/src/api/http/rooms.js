import axios from './config'


export const getRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/rooms/${roomId}`).then(onRequestFulfilled, onRequestRejected)
}

export const getAllRooms = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/rooms').then(onRequestFulfilled, onRequestRejected)
}

export const createRoom = (roomName, roomType, onRequestFulfilled, onRequestRejected) => {
    return axios.post('/api/rooms', { roomName, roomType }).then(onRequestFulfilled, onRequestRejected)
}

export const updateRoom = (roomId, update, onRequestFulfilled, onRequestRejected) => {
    return axios.patch(`/api/rooms/${roomId}`, update).then(onRequestFulfilled, onRequestRejected)
}

export const deleteRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    return axios.delete(`/api/rooms/${roomId}`).then(onRequestFulfilled, onRequestRejected)
}

export const joinRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    return axios.post(`/api/rooms/${roomId}/members`).then(onRequestFulfilled, onRequestRejected)
}

export const leaveRoom = (roomId, memberId, onRequestFulfilled, onRequestRejected) => {
    return axios.delete(`/api/rooms/${roomId}/members/${memberId}`).then(onRequestFulfilled, onRequestRejected)
}

export const getRoomMessage = (roomId, messageId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/rooms/${roomId}/messages/${messageId}`).then(onRequestFulfilled, onRequestRejected)
}

export const createMessage = (roomId, message, onRequestFulfilled, onRequestRejected) => {
    return axios.post(`/api/rooms/${roomId}/messages`, { message }).then(onRequestFulfilled, onRequestRejected)
}