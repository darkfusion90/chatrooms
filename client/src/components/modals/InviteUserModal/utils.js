import { change } from 'redux-form'

const selectUsername = (username) => {
    return change('invite-user-form', 'inviteeUsername', username)
}

export { selectUsername }