import { UPDATE_USER_ID } from "../constants/action_constants";

export default (userId) => {
    console.log('update user id: ' + userId);
    return {
        type: UPDATE_USER_ID,
        payload: userId
    }
}