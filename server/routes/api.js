const path = require('path')
const usersController = require('../controllers/users')
const logger = require('../utils/logger')('[ApiRouter] ')
const registrationFormValidator = require('../utils/registrationFormValidator')

const loginGet = (_, res) => {
    logger.debug('Login Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'loginForm.html'))
}

const registerGet = (_, res) => {
    logger.debug('Register Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'registrationForm.html'))
}

const registerPost = (req, res) => {
    logger.debug('Register Post')
    logger.debug('Req body: ', req.body)
    const { errors, hasErrors } = registrationFormValidator(req.body)

    if (hasErrors) {
        res.status(400).json(errors)
        return
    }

    usersController.registerUser(req.session.userId, req.body.username, req.body.password, (err, user) => {
        if (err) {
            res.status(500).send('Oops! The server was punched really hard by the Hulk :(')
        }
        else if (!user) {
            res.status(500).send('Oops! The server was punched really hard by the Hulk :(')
        }
        else {
            logger.debug('Reg Post callback. User: ', user)
            req.session.isRegistered = user.isRegistered
            req.session.save()
            res.redirect('/')
        }
    });
}

const handleLoginAction = (req, res) => {
    if (req.isAuthenticated()) {
        logger.debug('Authenticated user. Redirecting to /')
        res.redirect('/')
    }
    else if (req.method === 'GET') {
        loginGet(req, res)
    }
    else if (req.method === 'POST') {
        loginPost(req, res)
    }
}

const handleRegisterAction = (req, res) => {
    if (req.session.isRegistered) {
        logger.debug('Registered user. Redirecting to /')
        res.redirect('/')
    }
    else if (req.method === 'GET') {
        registerGet(req, res)
    }
    else if (req.method === 'POST') {
        registerPost(req, res)
    }
}

const handleUserStatusAction = (req, res) => {
    res.send({
        loggedIn: req.isAuthenticated()
    })
}

const parseApiAction = (apiRoute) => {
    if (/^\/api\/login[\/]{0,1}$/.test(apiRoute)) {
        return 'login'
    }

    if (/^\/api\/register[\/]{0,1}$/.test(apiRoute)) {
        return 'register'
    }

    if (/^\/api\/user_info[\/]{0,1}$/.test(apiRoute)) {
        return 'user_info'
    }

    return 'unknown'
}

const isMethodAllowed = (method) => {
    return method === 'GET' || method === 'POST'
}

const apiRouter = (req, res) => {
    logger.debug(req.path)

    if (!isMethodAllowed(req.method)) {
        logger.debug('METHOD NOT ALLOWED: ', req.method)
        res.status(405).end()
    }

    const action = parseApiAction(req.path)
    if (action === 'login') {
        logger.debug('action login')
        handleLoginAction(req, res)
    }
    else if (action === 'register') {
        logger.debug('action register')
        handleRegisterAction(req, res)
    }
    else if (action === 'user_info') {
        logger.debug('action user_info')
        handleUserStatusAction(req, res)
    }
    else {
        logger.debug('action unknown')
        res.status(404).send('Oops! Wrong action ;)')
    }
}

module.exports = apiRouter