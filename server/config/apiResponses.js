const reasons = {
    ALREADY_LOGGED_IN: "Already logged in"
}

const responseCreator = (success, payload, error) => {
    return {
        success: success,
        payload: payload,
        error: error
    }
}

const loginSuccess = (user) => {
    return responseCreator(true, { username: user.username }, null)
}

const loginFail = (reason) => {
    return responseCreator(false, {}, { reason })
}

const registerSuccess = (user) => {
    return responseCreator(true, { username: user.username }, null)
}