import { UPDATE_USER } from '../../action-constants'

import { users } from '../../../api/http'


const actionUpdateUser = (isLoggedIn, user) => {
    return {
        type: UPDATE_USER,
        payload: { isLoggedIn, user }
    }
}

const onGetCurrentUserSuccess = (userResponse, dispatch) => {
    const onCheckLoginStatusSuccess = (loginResponse) => {
        const user = userResponse.data
        const isLoggedIn = loginResponse.data.isLoggedIn
        dispatch(actionUpdateUser(isLoggedIn, user))
    }

    users.checkLoginStatus(onCheckLoginStatusSuccess, ({ response }) => console.log('Check user status fail: ', response))
}

export default () => async dispatch => {
    users.getCurrentUser(
        (response) => onGetCurrentUserSuccess(response, dispatch),
        ({ response }) => console.log('Get current user fail: ', response)
    )
}