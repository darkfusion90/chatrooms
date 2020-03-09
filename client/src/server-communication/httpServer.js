import Axios from 'axios';

const axios = Axios.create({ withCredentials: true })

export const registerUser = (username, password, confirmPassword, onRequestFulfilled, onRequestRejected) => {
    return axios.post('/api/register', { username, password, confirmPassword }).then(onRequestFulfilled, onRequestRejected)
}

export const loginUser = (username, password, onRequestFulfilled, onRequestRejected) => {
    return axios.post('/api/login', { username, password }).then(onRequestFulfilled, onRequestRejected)
}

export const getUser = (userId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/user/${userId}`).then(onRequestFulfilled, onRequestRejected)
}

export const getCurrentUser = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/user/').then(onRequestFulfilled, onRequestRejected)
}

export const checkLoginStatus = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/user/status/login').then(onRequestFulfilled, onRequestRejected)
}

export const logoutUser = (onRequestFulfilled, onRequestRejected) => {
    return axios.post('/api/logout').then(onRequestFulfilled, onRequestRejected);
}

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

export const getRoomMessage = (roomId, messageId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/rooms/${roomId}/messages/${messageId}`).then(onRequestFulfilled, onRequestRejected)
}

export const addMessageToRoom = (roomId, message, onRequestFulfilled, onRequestRejected) => {
    return axios.post(`/api/rooms/${roomId}/messages`, { message }).then(onRequestFulfilled, onRequestRejected)
}