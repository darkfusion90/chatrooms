import { REGISTER } from '../constants/actionConstants';
import serverApi from '../server-api';

const onRequestFulfilled = (response, dispatch) => {
    console.log("Request fulfilled: ", response)
    dispatch({ type: REGISTER })
}

const onRequestRejected = ({ response }, dispatch) => {
    console.log("Request rejected: ", response)
}

export default (username, password, confirmPassword) => async (dispatch) => {
    serverApi.registerUser(username, password, confirmPassword,
        (response) => onRequestFulfilled(response, dispatch),
        (reason) => onRequestRejected(reason, dispatch)
    )
}
