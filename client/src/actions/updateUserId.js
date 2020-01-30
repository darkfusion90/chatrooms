import { UPDATE_USER_ID } from '../constants/actionConstants';

export default (userId) => {
    console.log('update user id: ' + userId);
    return {
        type: UPDATE_USER_ID,
        payload: userId
    }
}