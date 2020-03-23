const hasPasswordMismatch = (password, confirmPassword) => {
    return password !== confirmPassword
}

export default (values) => {
    const { username, password, confirmPassword } = values;
    const errors = {}

    if (!username) {
        errors.username = "Username cannot be empty"
    }
    if (!password) {
        errors.password = "Password cannot be empty"
    }
    if (!confirmPassword) {
        errors.confirmPassword = "Confirm Password cannot be empty"
    } else if (hasPasswordMismatch(password, confirmPassword)) {
        const errMsg = "Confirm Password and Password must match"
        errors.confirmPassword = errMsg
        errors.password = errMsg
    }

    return errors
}