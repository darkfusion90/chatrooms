import { LOGOUT } from '../constants/actionConstants';

import {logoutUser} from '../server-communication/httpServer'

export default () => {
    logoutUser((response) => console.log("FULFILLED: ", response),
        ({ response }) => console.log("REJECTED: ", response));
    return {
        type: LOGOUT
    }
}
