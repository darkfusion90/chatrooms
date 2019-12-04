import { UPDATE_USER_ID } from "./types";

export default (userId) => {
    console.log('update user id: ' + userId);
    return {
        type: UPDATE_USER_ID,
        payload: userId
    }
}