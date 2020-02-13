import { LOGOUT } from '../constants/actionConstants';

import serverApi from '../server-api';

export default () => {
    serverApi.logoutUser((response) => console.log("FULFILLED: ", response),
        ({ response }) => console.log("REJECTED: ", response));
    return {
        type: LOGOUT
    }
}
