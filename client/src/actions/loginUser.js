import { loginUser } from '../server-communication/httpServer'

import { LOGIN } from '../constants/actionConstants'

const loginAction = (user) => {
    return {
        type: LOGIN,
        payload: {
            user: user
        }
    }
}

export default (username, password, onFailureCallback) => async (dispatch) => {
    const dispatchLoginAction = (response) => {
        dispatch(loginAction(response.data))
    }

    loginUser(username, password, dispatchLoginAction, onFailureCallback);
}
