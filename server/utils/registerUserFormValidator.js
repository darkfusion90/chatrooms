const validator = require('validator').default
const isEmpty = require('is-empty')


const convertEmptyFieldsToEmptyStrings = (data) => {
    data.username = isEmpty(data.username) ? '' : data.username
    data.password = isEmpty(data.password) ? '' : data.password
    data.confirmPassword = isEmpty(data.confirmPassword) ? '' : data.confirmPassword
}

const ensureDataNotEmpty = (data) => {
    const errors = {};
    if (validator.isEmpty(data.username)) {
        errors.usernameEmpty = 'Username field cannot be empty'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordEmpty = 'Password field cannot be empty'
    }

    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPasswordEmpty = 'Confirm Password field cannot be empty'
    }

    return errors
}

module.exports = (data) => {
    convertEmptyFieldsToEmptyStrings(data)
    const errors = { ...ensureDataNotEmpty(data) }
    const { password, confirmPassword } = data

    if (!validator.equals(password, confirmPassword)) {
        errors.passwordsMismatch = 'Password and Confirm Password should match'
    }

    return {
        errors: errors,
        hasErrors: !isEmpty(errors)
    }
}
