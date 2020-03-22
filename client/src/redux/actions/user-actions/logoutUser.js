import { LOGOUT } from '../../action-constants';

import { logoutUser } from '../../../server-communication/httpServer'

export default () => async dispatch => {
    logoutUser(() => dispatch({ type: LOGOUT }),({ response }) => console.log('Logout Failed: ', response));
}
