const path = require('path')
const usersController = require('../controllers/users')
const logger = require('../utils/logger')('[ApiRouter] ')

const loginGet = (_, res) => {
    logger.debug('Login Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'loginForm.html'))
}

const loginPost = (req, res) => {
    logger.debug('Login Post')
    logger.debug('Req body: ', req.body)
    res.redirect('/')
}

const registerGet = (_, res) => {
    logger.debug('Register Get')
    res.sendFile(path.join(__dirname, '../', 'html', 'registrationForm.html'))
}

const registerPost = (req, res) => {
    logger.debug('Register Post')
    logger.debug('Req body: ', req.body)
    usersController.registerUser(req.session.userId, req.body.username, req.body.password, (err, user) => {
        logger.debug('Reg Post callback. User: ', user)
    });
    res.redirect('/')
}

const handleLoginAction = (req, res) => {
    if (req.method === 'GET') {
        loginGet(req, res)
    }
    else if (req.method === 'POST') {
        loginPost(req, res)
    }
}

const handleRegisterAction = (req, res) => {
    if (req.method === 'GET') {
        registerGet(req, res)
    }
    else if (req.method === 'POST') {
        registerPost(req, res)
    }
}

const parseApiAction = (apiRoute) => {
    if (/^\/api\/login[\/]{0,1}$/.test(apiRoute)) {
        return 'login'
    }

    if (/^\/api\/register[\/]{0,1}$/.test(apiRoute)) {
        return 'register'
    }

    return 'unknown'
}

const isMethodAllowed = (method) => {
    return method === 'GET' || method === 'POST'
}

const apiRouter = (req, res) => {
    logger.debug(req.path)

    if (!isMethodAllowed(req.method)) {
        logger.debug('METHOD NOT ALLOWED: %s', req.method)
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
    else {
        logger.debug('action unknown')
        res.status(404).send('Oops! Wrong action ;)')
    }
}

module.exports = apiRouter