import { LOGOUT } from '../../action-constants';

import { users } from '../../../api/http'

export default () => async dispatch => {
    users.logoutUser(() => dispatch({ type: LOGOUT }),({ response }) => console.log('Logout Failed: ', response));
}
