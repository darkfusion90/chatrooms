import { REGISTER } from '../constants/actionConstants';
import { registerUser } from '../server-communication/httpServer'


export default (username, password, confirmPassword, onRequestRejected) => async (dispatch) => {
    registerUser(username, password, confirmPassword,
        (response) => dispatch({ type: REGISTER, payload: response.data }),
        onRequestRejected
    )
}
