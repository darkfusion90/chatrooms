import { MESSAGE_RECIEVED } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    if (action.type === MESSAGE_RECIEVED) {
        return [...state,
        {
            message: action.payload.messageMeta.message,
            senderId: action.payload.messageMeta.senderId
        }];
    }

    return state;
}