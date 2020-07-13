const validator = require('validator').default
const isEmpty = require('is-empty')


const convertEmptyFieldsToEmptyStrings = (data) => {
    data.username = isEmpty(data.username) ? '' : data.username
    data.password = isEmpty(data.password) ? '' : data.password
}

const ensureDataNotEmpty = (data) => {
    const errors = {};
    if (validator.isEmpty(data.username)) {
        errors.usernameEmpty = 'Username field cannot be empty'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordEmpty = 'Password field cannot be empty'
    }

    return errors
}

module.exports = (data) => {
    convertEmptyFieldsToEmptyStrings(data)
    const errors = { ...ensureDataNotEmpty(data) }

    return {
        errors: errors,
        hasErrors: !isEmpty(errors)
    }
}
