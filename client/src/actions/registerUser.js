import { REGISTER } from '../constants/actionConstants';
import {registerUser} from '../server-communication/httpServer'

const onRequestFulfilled = (response, dispatch) => {
    console.log("Register Request fulfilled: ", response)
    dispatch({ type: REGISTER, payload: { username: response.data.username } })
}

export default (username, password, confirmPassword, onRequestRejected) => async (dispatch) => {
    registerUser(username, password, confirmPassword,
        (response) => onRequestFulfilled(response, dispatch),
        onRequestRejected
    )
}
