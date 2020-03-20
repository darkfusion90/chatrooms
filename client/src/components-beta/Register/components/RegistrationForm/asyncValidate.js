import { checkUsername } from '../../../../server-communication/socketServer'

export const USERNAME_TAKEN_ERROR_MESSAGE = 'That username is already taken'

export const checkUsernameExists = (values, _) => {
    return new Promise((resolve, reject) =>
        checkUsername(values.username, (response) => {
            if (response.status === 200) {
                reject({ 'username': USERNAME_TAKEN_ERROR_MESSAGE })
            }
            else {
                resolve()
            }
        })
    )
}