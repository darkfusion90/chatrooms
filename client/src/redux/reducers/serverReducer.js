import { CONNECT_TO_SERVER } from '../action-constants';
import initialStates from '../initial-states'


export default (state = initialStates.serverConnection, action) => {
    if (action.type === CONNECT_TO_SERVER) {
        return {connected: action.payload.connected}
    }

    return state;
}