import { LOGIN_SUCCESS, LOGIN_FAIL, UPDATE_USER_INFO } from '../constants/actionConstants';

const INITIAL_STATE = {
    loggedIn: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { loggedIn: true }
        case LOGIN_FAIL:
            return INITIAL_STATE
        case UPDATE_USER_INFO:
            return { ...action.payload }
        default:
            return state;
    }
}