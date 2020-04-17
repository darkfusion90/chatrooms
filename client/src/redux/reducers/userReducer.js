import { LOGIN, UPDATE_USER, LOGOUT, REGISTER } from '../action-constants';
import initialStates from '../initial-states'


export default (state = initialStates.user, action) => {
    switch (action.type) {
        case LOGIN:
            return { isLoggedIn: true, user: action.payload.user }
        case LOGOUT:
            return initialStates.user
        case REGISTER:
            return { isLoggedIn: false, user: action.payload }
        case UPDATE_USER:
            //Update only what is provided in payload
            return { ...state, ...action.payload }
        default:
            return state;
    }
}