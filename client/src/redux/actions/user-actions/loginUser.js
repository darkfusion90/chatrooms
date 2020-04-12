import { LOGIN } from '../../action-constants'
import { users } from '../../../api/http'

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

    users.loginUser(username, password, dispatchLoginAction, onFailureCallback);
}
