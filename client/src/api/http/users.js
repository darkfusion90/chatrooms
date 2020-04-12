import axios from './config'


export const registerUser = (username, password, confirmPassword, onRequestFulfilled, onRequestRejected) => {
    return axios.post('/api/register', { username, password, confirmPassword }).then(onRequestFulfilled, onRequestRejected)
}

export const loginUser = (username, password, onRequestFulfilled, onRequestRejected) => {
    return axios.post('/api/login', { username, password }).then(onRequestFulfilled, onRequestRejected)
}

export const getUser = (userId, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/user/${userId}`).then(onRequestFulfilled, onRequestRejected)
}

export const getUserByUsername = (username, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/user/${username}/?byUsername=true`)
        .then(onRequestFulfilled, onRequestRejected)
}

export const getCurrentUser = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/user/').then(onRequestFulfilled, onRequestRejected)
}

export const searchUsers = (username, onRequestFulfilled, onRequestRejected) => {
    return axios.get(`/api/search?category=user&query=${username}`)
        .then(onRequestFulfilled, onRequestRejected)
}

export const checkLoginStatus = (onRequestFulfilled, onRequestRejected) => {
    return axios.get('/api/user/status/login').then(onRequestFulfilled, onRequestRejected)
}

export const logoutUser = (onRequestFulfilled, onRequestRejected) => {
    return axios.post('/api/logout').then(onRequestFulfilled, onRequestRejected);
}