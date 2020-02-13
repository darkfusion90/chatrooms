import { LOGIN, UPDATE_USER_INFO, LOGOUT } from '../constants/actionConstants';

const INITIAL_STATE = {
    loggedIn: false,
    username: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { loggedIn: true, username: action.payload.username }
        case LOGOUT:
            return INITIAL_STATE
        case UPDATE_USER_INFO:
            return { ...action.payload }
        default:
            return state;
    }
}