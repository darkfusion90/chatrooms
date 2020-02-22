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

export const logoutUser = (onRequestFulfilled, onRequestRejected) => {
    axios.post('/api/logout').then(onRequestFulfilled, onRequestRejected);
}

export const fetchUserInfo = (onRequestFulfilled, onRequestRejected) => {
    axios.get('/api/user_info').then(onRequestFulfilled, onRequestRejected);
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