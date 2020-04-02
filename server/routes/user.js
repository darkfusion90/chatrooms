const { isValidObjectId } = require('mongoose')
const {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR
} = require('../constants/httpStatusCodes')
const { genericHandlerCallback } = require('./routeUtils')
const {
    createRegisteredUser,
    registerUser,
    getUser,
    getUserByUsername,
    updateUser,
    deleteUser
} = require('../controllers/users')
const registerUserFormValidator = require('../utils/registerUserFormValidator')
const updateSessionExpiryRegisteredUser = require('../utils/updateSessionExpiryRegisteredUser')

const get = (req, res) => {
    const getUserId = () => {
        //In case of "/api/user/:id", the id passed in url will be used
        //In case of "/api/user", the id will be taken from the session of the client
        const { userId: paramsUserId } = req.params
        const { userId: sessionUserId } = req.session
        return paramsUserId ? paramsUserId : sessionUserId
    }

    const callback = (err, user) => genericHandlerCallback(err, user, res)
    //NOTE: Don't change the comparison to boolean type comparison by ditching the === 'true part
    //The query is received as string so a string comparison is necessary
    if ((req.query.byUsername + '').toLowerCase() === 'true') {
        return getUserByUsername(getUserId(), false, callback)
    } else if (!isValidObjectId(getUserId())) {
        return res.status(BAD_REQUEST).json({ userId: 'Parameter \'userId\' must be of type ObjectId' })
    }

    return getUser(getUserId(), callback)
}

const patch = (req, res) => {
    //Authorization is done in ensureAuthenticated middleware
    updateUser(req.params.userId, req.body, (err, user) => genericHandlerCallback(err, user, res))
}

const _delete = (req, res) => {
    deleteUser(req.params.userId, (err, user) => genericHandlerCallback(err, user, res))
    req.session.destroy()
}

const post = (req, res) => {
    if (req.session.redirectedFromRegister && !req.session.isRegistered) {
        handleRegisterUser(req, res)
        req.session.redirectedFromRegister = false
        req.session.save()
    } else {
        res.json({})
    }
}

const handleRegisterUser = (req, res) => {
    const { errors, hasErrors } = registerUserFormValidator(req.body)

    if (hasErrors) {
        res.status(BAD_REQUEST).json(errors)
    }
    else if (!req.session.userId) {
        createRegisteredUser(req.body, (err, user) => registerUserCallback(err, user, req, res))
    }
    else {
        registerUser(req.session.userId, req.body.username, req.body.password, (err, user) => registerUserCallback(err, user, req, res));
    }
}

const registerUserCallback = (err, user, req, res) => {
    if (err) {
        genericHandlerCallback(err, user, res)
    }
    else if (user) {
        req.session.userId = user._id
        req.session.isRegistered = user.isRegistered
        req.session.cookie.expires = updateSessionExpiryRegisteredUser(req.session.cookie.expires)
        req.session.save()
        res.json(user)
    } else {
        res.status(INTERNAL_SERVER_ERROR).json({})
    }
}

const loginStatus = (req, res) => {
    res.json({ isLoggedIn: req.isAuthenticated() })
}

module.exports = { get, post, patch, _delete, loginStatus }
