const httpStatusCodes = require('../constants/httpStatusCodes')
const { genericHandlerCallback } = require('./routeUtils')
const { createUnregisteredUser, registerUser, getUser, updateUser, deleteUser } = require('../controllers/users')
const registerUserFormValidator = require('../utils/registerUserFormValidator')

const get = (req, res) => {
    let userId;
    //In case of "/api/user/:id", the id passed in url will be used
    //In case of "/api/user", the id will be taken from the session of the client
    if (req.params.id) {
        userId = req.params.id
    }
    else if (req.session.userId) {
        userId = req.session.userId
    }
    getUser(userId, (err, user) => genericHandlerCallback(err, user, res))
}

const patch = (req, res) => {
    //Authorization is done in ensureAuthenticated middleware
    updateUser(req.params.id, req.body, (err, user) => genericHandlerCallback(err, user, res))
}

const _delete = (req, res) => {
    deleteUser(req.params.id, (err, user) => genericHandlerCallback(err, user, res))
    req.session.destroy()
}

const post = (req, res) => {
    console.log("stuff: ", req.session)

    if(req.session.redirectedFromCookieCreator){
        if(req.session.redirectedFromRegister){
            handl
        }
    }
}

const handleCreateUnregisteredUser = (req, res) => {
    createUnregisteredUser(req.session.expires, (err, user) => {
        //In this case, unable to create user is the server's fault because the client doesn't send any payload
        //Hence, there is no way for the client to screw up
        //Failure will generally occur due to duplicate userId (automatically generated in the users controller)
        if (err || !user) {
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({})
        }

        req.session.userId = user.userId
        req.session.isRegistered = false
        req.session.save()
        res.json(user)
    })
}

const handleRegisterUser = (req, res) => {
    const { errors, hasErrors } = registerUserFormValidator(req.body)

    if (hasErrors) {
        return res.status(httpStatusCodes.BAD_REQUEST).json(errors)
    }

    registerUser(req.session.userId, req.body.username, req.body.password, (err, _user) => {
        const user = genericHandlerCallback(err, _user, res, true)
        if (user) {
            req.session.isRegistered = user.isRegistered
            req.session.save()
            res.json(user)
        }
    });
}

module.exports = { get, post, patch, _delete }
