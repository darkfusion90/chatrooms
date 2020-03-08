import { LOGIN, UPDATE_USER, LOGOUT, REGISTER } from '../constants/actionConstants';

const INITIAL_STATE = {
    isLoggedIn: false,
    user: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { isLoggedIn: true, user: action.payload.user }
        case LOGOUT:
            return INITIAL_STATE
        case REGISTER:
            return { isLoggedIn: false, user: action.payload }
        case UPDATE_USER:
            //Update only what is provided in payload
            return { ...state, ...action.payload }
        default:
            return state;
    }
}