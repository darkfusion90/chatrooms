import { LOGIN, UPDATE_USER_INFO, LOGOUT, REGISTER } from '../constants/actionConstants';

const INITIAL_STATE = {
    loggedIn: false,
    isRegistered: false,
    username: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { loggedIn: true, isRegistered: true, username: action.payload.username }
        case LOGOUT:
            return INITIAL_STATE
        case UPDATE_USER_INFO:
            return { ...action.payload }
        case REGISTER:
            return { loggedIn: false, isRegistered: true, username: action.payload.username }
        default:
            return state;
    }
}