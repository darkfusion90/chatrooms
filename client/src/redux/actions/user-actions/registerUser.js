import { REGISTER } from '../../action-constants';
import { users } from '../../../api/http'


export default (username, password, confirmPassword, onRequestRejected) => async (dispatch) => {
    users.registerUser(username, password, confirmPassword,
        (response) => dispatch({ type: REGISTER, payload: response.data }),
        onRequestRejected
    )
}
