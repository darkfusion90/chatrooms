import { MESSAGE_RECIEVED } from '../constants/actionConstants';

export default (messageMeta) => {
    return {
        type: MESSAGE_RECIEVED,
        payload: { messageMeta: messageMeta }
    }
}
