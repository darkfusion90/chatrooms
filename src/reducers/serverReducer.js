import { CONNECT_TO_SERVER } from '../constants/actionConstants';

const INITIAL_STATE = {
    connected: false
}

export default (state = INITIAL_STATE, action) => {
    if (action.type === CONNECT_TO_SERVER) {
        return {connected: action.payload.connected}
    }

    return state;
}