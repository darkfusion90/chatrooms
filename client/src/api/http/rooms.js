import axios from './config'


export const getRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/rooms/${roomId}`).then(onRequestFulfilled, onRequestRejected)
}

export const getRooms = (limit, offset, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/rooms/?limit=${limit}&offset=${offset}`)
        .then(onRequestFulfilled, onRequestRejected)
}

export const countTotalPublicRooms = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/count/rooms', onRequestFulfilled, onRequestRejected)
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