import {loginUser} from '../server-communication/httpServer'

import { LOGIN } from '../constants/actionConstants'

const onRequestFulfilled = (dispatch, response, onFailureCallback) => {
    console.log("onRequestFulfilled: ", response.data)
    if (response.data.error) {
        onFailureCallback(response)
    }
    else {
        dispatch(loginAction(response.data.username))
    }
}

const loginAction = (username) => {
    return {
        type: LOGIN,
        payload: {
            username: username
        }
    }
}

export default (username, password, onFailureCallback) => async (dispatch) => {
    loginUser(
        username,
        password,
        (response) => {
            onRequestFulfilled(dispatch, response, onFailureCallback)
        },
        (reason) => onFailureCallback(reason.response)
    );
}
