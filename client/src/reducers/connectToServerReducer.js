import { NEW_SERVER_CONNECTION } from '../actions/types';

const INITIAL_STATE = {
    connected: false
}

export default (state = INITIAL_STATE, action) => {
    if (action.type === NEW_SERVER_CONNECTION) {
        return {
            ...state,
            connected: true,
            webSocket: action.payload
        }
    }

    return state;
}