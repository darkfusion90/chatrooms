const hasPasswordMismatch = (password, confirmPassword) => {
    return password !== confirmPassword
}

export default (values) => {
    const { username, password, confirmPassword } = values;
    const errors = {}

    if (!username) {
        errors.username = "Required"
    }
    if (!password) {
        errors.password = "Required"
    }
    if (!confirmPassword) {
        errors.confirmPassword = "Required"
    } else if (hasPasswordMismatch(password, confirmPassword)){
        errors.confirmPassword = "Password Mismatch"
    }

    return errors
}