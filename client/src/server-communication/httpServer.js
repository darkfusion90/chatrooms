import Axios from 'axios';

const axios = Axios.create({ withCredentials: true })

export const registerUser = (username, password, confirmPassword, onRequestFulfilled, onRequestRejected) => {
    axios.post('/api/register', { username, password, confirmPassword }).then(onRequestFulfilled, onRequestRejected)
}

export const loginUser = (username, password, onRequestFulfilled, onRequestRejected) => {
    axios.post('/api/login', { username, password }).then(onRequestFulfilled, onRequestRejected)
}

export const getUser = (userId, onRequestFulfilled, onRequestRejected) => {
    axios.get(`/api/user/${userId}`).then(onRequestFulfilled, onRequestRejected)
}

export const getCurrentUser = (onRequestFulfilled, onRequestRejected) => {
    axios.get('/api/user/').then(onRequestFulfilled, onRequestRejected)
}

export const checkLoginStatus = (onRequestFulfilled, onRequestRejected) => {
    axios.get('/api/user/status/login').then(onRequestFulfilled, onRequestRejected)
}

export const logoutUser = (onRequestFulfilled, onRequestRejected) => {
    axios.post('/api/logout').then(onRequestFulfilled, onRequestRejected);
}

export const getRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    axios.get(`/api/rooms/${roomId}`).then(onRequestFulfilled, onRequestRejected)
}

export const getAllRooms = (onRequestFulfilled, onRequestRejected) => {
    axios.get('/api/rooms').then(onRequestFulfilled, onRequestRejected)
}

export const createRoom = (roomName, roomType, onRequestFulfilled, onRequestRejected) => {
    axios.post('/api/rooms', { roomName, roomType }).then(onRequestFulfilled, onRequestRejected)
}

export const updateRoom = (roomId, update, onRequestFulfilled, onRequestRejected) => {
    axios.patch(`/api/rooms/${roomId}`, update).then(onRequestFulfilled, onRequestRejected)
}

export const deleteRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    axios.delete(`/api/rooms/${roomId}`).then(onRequestFulfilled, onRequestRejected)
}

export const joinRoom = (roomId, onRequestFulfilled, onRequestRejected) => {
    axios.post(`/api/rooms/${roomId}/members`).then(onRequestFulfilled, onRequestRejected)
}

export const getRoomMessage = (roomId, messageId, onRequestFulfilled, onRequestRejected) => {
    axios.get(`/api/rooms/${roomId}/messages/${messageId}`).then(onRequestFulfilled, onRequestRejected)
}

export const addMessageToRoom = (roomId, message, onRequestFulfilled, onRequestRejected) => {
    axios.post(`/api/rooms/${roomId}/messages`, { message }).then(onRequestFulfilled, onRequestRejected)
}