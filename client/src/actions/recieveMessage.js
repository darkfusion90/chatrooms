import { MESSAGE_RECIEVED } from './types';

export default (messageMeta) => {
    return {
        type: MESSAGE_RECIEVED,
        payload: { messageMeta: messageMeta }
    }
}
