import { users } from '../../../../api/http'

export const USERNAME_TAKEN_ERROR_MESSAGE = 'That username is already taken'

export const checkUsernameExists = (values, _) => {
    return new Promise((resolve, reject) => {
        const onUsernameFound = () => {
            reject({ 'username': USERNAME_TAKEN_ERROR_MESSAGE })
        }
        users.getUserByUsername(values.username, onUsernameFound, resolve)
    })
}