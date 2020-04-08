import { getUserByUsername } from '../../../../server-communication/httpServer'

export const USERNAME_TAKEN_ERROR_MESSAGE = 'That username is already taken'

export const checkUsernameExists = (values, _) => {
    return new Promise((resolve, reject) => {
        const onUsernameFound = () => {
            reject({ 'username': USERNAME_TAKEN_ERROR_MESSAGE })
        }
        getUserByUsername(values.username, onUsernameFound, resolve)
    })
}