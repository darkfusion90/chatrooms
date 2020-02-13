import serverApi from '../server-api';

import { LOGIN_FAIL, LOGIN_SUCCESS } from '../constants/actionConstants'

const onRequestFulfilled = (dispatch, response) => {
    console.log("onRequestFulfilled: ", response.data)
    if (response.data.success === "true") {
        dispatch(loginSuccessAction(response.data.userId))
    }
    else {
        dispatch(loginFailAction(response.data.reason))
    }
}

const onRequestRejected = (dispatch, { response }) => {
    console.log("onRequestRejected: ", response.data)
    dispatch(loginFailAction(response.data.message))
}

const loginFailAction = (reason) => {
    return {
        type: LOGIN_FAIL,
        payload: {
            status: "failed",
            reason: reason
        }
    }
}

const loginSuccessAction = (userId) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            status: "success",
            userId: userId
        }
    }
}

export default (username, password, onFailureCallback) => async (dispatch) => {
    serverApi.loginUser(
        username,
        password,
        (response) => {
            onRequestFulfilled(dispatch, response)
        },
        (reason) => {
            onRequestRejected(dispatch, reason)
            onFailureCallback(reason)
        }
    );
}
