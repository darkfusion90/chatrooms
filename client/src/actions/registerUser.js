import { REGISTER } from '../constants/actionConstants';
import serverApi from '../server-api';

const onRequestFulfilled = (response, dispatch) => {
    console.log("Register Request fulfilled: ", response)
    dispatch({ type: REGISTER, payload: { username: response.data.username } })
}

export default (username, password, confirmPassword, onRequestRejected) => async (dispatch) => {
    serverApi.registerUser(username, password, confirmPassword,
        (response) => onRequestFulfilled(response, dispatch),
        onRequestRejected
    )
}
